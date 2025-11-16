export async function GET(req, { params }) {
    const { id } = await params;

    const res = await fetch(
        `https://api.subsource.net/api/v1/subtitles/${id}/download`,
        {
            method: "GET",
            headers: {
                "x-api-key": process.env.NEXT_PUBLIC_SUBSOURCE_API_KEY,
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
