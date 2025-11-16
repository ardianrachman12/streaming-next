// export async function getMovieIdFromImdb(imdbId) {
//     const url = `https://api.subsource.net/api/v1/movies/search?searchType=imdb&imdb=${imdbId}`;

//     const res = await fetch(url, {
//         headers: {
//             accept: "application/json",
//             "x-api-key": process.env.NEXT_PUBLIC_SUBSOURCE_API_KEY,
//         },
//         next: { revalidate: 3600 }, // optional caching
//     });

//     const json = await res.json();
//     return json ?? null;
// }


// export async function getSubtitles(movieId, language = "indonesian") {
//     if (!movieId) return [];

//     const url = `https://api.subsource.net/api/v1/subtitles?movieId=${movieId}&language=${language}&limit=100`;

//     const res = await fetch(url, {
//         headers: {
//             accept: "application/json",
//             "x-api-key": process.env.NEXT_PUBLIC_SUBSOURCE_API_KEY,
//         },
//         next: { revalidate: 300 },
//     });

//     const json = await res.json();
//     return json ?? [];
// }

function baseUrl() {
    if (process.env.NEXT_PUBLIC_URL)
        return `${process.env.NEXT_PUBLIC_URL}`;

    if (process.env.NEXT_APP_ENV == 'local'){
        return "http://localhost:3000";
    } else {
        return "https://stream-myplay.vercel.app";
    }
}

export async function getMovieIdFromImdb(imdbId) {
    const res = await fetch(
        `${baseUrl()}/api/movie?imdb=${imdbId}`,
        { cache: "no-store" }
    );

    return res.json();
}

export async function getSubtitles(movieId, lang = "indonesian") {
    const res = await fetch(
        `${baseUrl()}/api/subtitles?movieId=${movieId}&lang=${lang}`,
        { cache: "no-store" }
    );

    return res.json();
}

