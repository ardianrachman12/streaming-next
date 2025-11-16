import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const movieId = searchParams.get("movieId");
    const lang = searchParams.get("lang") ?? "indonesian";

    if (!movieId) return NextResponse.json({ error: "Missing movieId" }, { status: 400 });

    console.log("🔑 API KEY:", process.env.SUBSOURCE_API_KEY ? "OK" : "MISSING");

    const upstream = await fetch(
        `https://api.subsource.net/api/v1/subtitles?movieId=${movieId}&language=${lang}&limit=100`,
        {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
                accept: "application/json",
                "x-api-key": process.env.SUBSOURCE_API_KEY,
            },
        }
    );

    console.log("⬆ STATUS:", upstream.status);

    const text = await upstream.text(); // ⬅ JANGAN langsung .json()
    console.log("⬆ RAW RESPONSE:", text.slice(0, 300));

    try {
        return NextResponse.json(JSON.parse(text));
    } catch (e) {
        return NextResponse.json(
            { error: "Upstream is not JSON", raw: text },
            { status: 500 }
        );
    }
}
