"use client";

import { useState } from "react";

export default function SubtitleList({ data }) {
  const [downloadingId, setDownloadingId] = useState(null);

  const handleDownload = async (id) => {
    setDownloadingId(id);

    try {
      const res = await fetch(`/api/subtitles/download/${id}`);

      if (!res.ok) throw new Error("Download failed");

      const cd = res.headers.get("Content-Disposition");
      const filename =
        cd?.split('filename="')[1]?.replace('"', "") ?? `sub-${id}.zip`;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("❌ Subtitle download failed");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-3 py-10">
      <h2 className="font-semibold text-lg mb-2">Subtitles List</h2>

      {data.length > 0 ? (
        data.map((sub) => (
          <div
            key={sub.subtitleId}
            className="border border-gray-700 p-4 rounded-lg bg-gray-800/40 hover:bg-gray-800 transition flex justify-between items-start"
          >
            <div className="space-y-1">
              <p className="font-semibold text-base">
                {sub.language.toUpperCase()} • {sub.releaseInfo?.join(" ")}
              </p>

              <p className="text-sm text-gray-400">
                Downloads: <span className="font-medium">{sub.downloads}</span>{" "}
                — Rating 👍 {sub.rating.good} / 👎 {sub.rating.bad}
              </p>

              <p className="text-xs text-gray-500">
                Uploaded: {new Date(sub.createdAt).toISOString().split("T")[0]}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              {/* <a
                href={`https://subsource.net${sub.link}`}
                target="_blank"
                className="text-blue-400 text-sm underline hover:text-blue-300"
              >
                View
              </a> */}

              <button
                onClick={() => handleDownload(sub.subtitleId)}
                disabled={downloadingId === sub.subtitleId}
                className={`px-3 py-1 rounded text-xs cursor-pointer
                  ${
                    downloadingId === sub.subtitleId
                      ? "bg-gray-600"
                      : "bg-blue-600 hover:bg-blue-500"
                  }`}
              >
                {downloadingId === sub.subtitleId
                  ? "Downloading..."
                  : "Download"}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-sm">No subtitles found</p>
      )}
    </div>
  );
}
