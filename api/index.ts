import type { VercelRequest, VercelResponse } from "@vercel/node";

// Import the server handler
import serverHandler from "../src/server";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Build the full URL
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const pathname = req.url || "/";
    const url = `${protocol}://${host}${pathname}`;

    // Prepare headers
    const headers = new Headers();
    Object.entries(req.headers).forEach(([key, value]) => {
      if (value && typeof value === "string") {
        headers.set(key, value);
      } else if (Array.isArray(value)) {
        headers.set(key, value.join(", "));
      }
    });

    // Create a Fetch API Request
    let body: BodyInit | null = null;
    if (req.body && (req.method !== "GET" && req.method !== "HEAD")) {
      body = JSON.stringify(req.body);
    }

    const request = new Request(url, {
      method: req.method,
      headers,
      body,
    });

    // Call the handler
    const response = await serverHandler.fetch(request, {}, {});

    // Set response headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Send response
    res.status(response.status);
    
    if (response.body) {
      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));
    } else {
      res.send("");
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" });
  }
}
