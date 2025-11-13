export async function GET({}) {
    try {
        const response = await fetch("https://feeds.meteoalarm.org/api/v1/warnings/feeds-italy/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            return new Response(JSON.stringify(await response.json()), { status: response.status });
        }

        const data = await response.json();
        return new Response(JSON.stringify(data));
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500
        });
    }
}