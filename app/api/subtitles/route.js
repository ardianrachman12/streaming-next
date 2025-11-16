import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const movieId = searchParams.get("movieId");
    const lang = searchParams.get("lang") ?? "indonesian";

    if (!movieId)
        return NextResponse.json({ error: "Missing movieId" }, { status: 400 });

    const res = await fetch(
        `https://api.subsource.net/api/v1/subtitles?movieId=${movieId}&language=${lang}&limit=100`,
        {
            headers: {
                accept: "application/json",
                "x-api-key": process.env.SUBSOURCE_API_KEY,
            },
        }
    );

    const json = await res.json();
    return NextResponse.json(json);
}
