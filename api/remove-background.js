export const config = {
    runtime: 'edge', // Use Edge Runtime to bypass the 10-second Serverless timeout
};

export default async function handler(req) {
    // CORS preflight safety net
    if (req.method === "OPTIONS") {
        return new Response(null, {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    }

    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { "Content-Type": "application/json" }
        });
    }

    try {
        // Forward the request natively using the Edge Runtime
        // Edge allows us to stream req.body directly to n8n without loading it into memory!
        const n8nUrl = "https://bitflipper96.app.n8n.cloud/webhook/remove-background";

        // We clone the request headers since Vercel might pass host headers if we don't selectively pick
        const headers = new Headers();
        const contentType = req.headers.get("content-type");
        if (contentType) headers.set("content-type", contentType);

        const n8nResponse = await fetch(n8nUrl, {
            method: "POST",
            headers,
            body: req.body, // Pass the ReadableStream directly
            duplex: "half", // Required for sending streams in some native fetch implementations
        });

        // Pipe the response directly back to the client
        return new Response(n8nResponse.body, {
            status: n8nResponse.status,
            headers: {
                "Content-Type": n8nResponse.headers.get("content-type") || "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch (error) {
        console.error("Edge Proxy error:", error);
        return new Response(JSON.stringify({ error: error.message || "Proxy request failed" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        });
    }
}
