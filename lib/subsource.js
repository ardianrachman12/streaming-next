export async function getMovieIdFromImdb(imdbId) {
    const url = `https://api.subsource.net/api/v1/movies/search?searchType=imdb&imdb=${imdbId}`;

    const res = await fetch(url, {
        headers: {
            accept: "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SUBSOURCE_API_KEY,
        },
        next: { revalidate: 3600 }, // optional caching
    });

    const json = await res.json();
    return json ?? null;
}


export async function getSubtitles(movieId, language = "indonesian") {
    if (!movieId) return [];

    const url = `https://api.subsource.net/api/v1/subtitles?movieId=${movieId}&language=${language}&limit=100`;

    const res = await fetch(url, {
        headers: {
            accept: "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SUBSOURCE_API_KEY,
        },
        next: { revalidate: 300 },
    });

    const json = await res.json();
    return json ?? [];
}

