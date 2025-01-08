import { NextResponse } from "next/server";

export function middleware(request) {
  // Get the origin of the request
  const origin = request.headers.get("origin") || "";

  // Create response object
  const response = NextResponse.next();

  // Add CORS headers
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Max-Age", "86400");

  // Add custom headers for Paytm API
  response.headers.set(
    "User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );
  response.headers.set("Accept", "application/json");
  response.headers.set("Accept-Language", "en-US,en;q=0.9");
  response.headers.set("Origin", "https://travel.paytm.com");
  response.headers.set("Referer", "https://travel.paytm.com/");

  return response;
}

// Configure which routes should be handled by middleware
export const config = {
  matcher: "/api/:path*",
};
