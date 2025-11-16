export async function GET(req, { params }) {
    const { id } = await params;

    const res = await fetch(
        `https://api.subsource.net/api/v1/subtitles/${id}/download`,
        {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
                "x-api-key": process.env.SUBSOURCE_API_KEY,
            },
        }
    );


    const arrayBuffer = await res.arrayBuffer(); // WAJIB

    const headers = new Headers(res.headers);

    return new Response(arrayBuffer, {
        status: res.status,
        headers,
    });
}
