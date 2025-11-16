import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const imdb = searchParams.get("imdb");

    if (!imdb) return NextResponse.json({ error: "Missing imdb" }, { status: 400 });

    const res = await fetch(
        `https://api.subsource.net/api/v1/movies/search?searchType=imdb&imdb=${imdb}`,
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
