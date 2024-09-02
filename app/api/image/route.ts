export async function GET(request : Request) {
    console.log(request);

    // Example response data
    const responseData = {
        message: "GET request received",
        method: request.method,
        url: request.url,
    };

    // Return a JSON response with a 200 status code
    return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}


