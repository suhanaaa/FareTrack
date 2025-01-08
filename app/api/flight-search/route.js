// import { auth } from "@/auth";
// import { NextResponse } from "next/server";
// import Search from "@/models/Search";
// import connectMongo from "@/libs/mongoose";
// import User from "@/models/User";

// export async function POST(req) {
//   try {
//     const body = await req.json();

//     //Get the session from the request
//     const session = await auth();

//     if (!session) {
//       return NextResponse.json({ error: "Not authorized" }, { status: 401 });
//     }

//     //destructing the required data
//     const { tripType, fromLocation, toLocation, startDate, endDate } = body;

//     //validating the necessary fields
//     if (
//       !tripType ||
//       !fromLocation ||
//       !toLocation ||
//       !startDate ||
//       (tripType === "roundtrip" && !endDate)
//     ) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     await connectMongo();

//     // Count the number of searches made by the logged-in user
//     const count = await Search.countDocuments({ userId: session.user.id });

//     console.log("Search Count:", count);

//     // Check if the user has exceeded the search limit of 50
//     if (count >= 500) {
//       return NextResponse.json(
//         { error: "Search limit reached, ugrade the plan" },
//         { status: 403 }
//       );
//     }

//     // Log the user's search in the database
//     await Search.create({
//       userId: session.user.id,
//       tripType,
//       fromLocation,
//       toLocation,
//       startDate,
//       endDate: tripType === "roundtrip" ? endDate : null,
//     });

//     // Build the URL for the Paytm API based on trip type (oneway or roundtrip)
//     const apiUrl =
//       tripType === "oneway"
//         ? `https://travel.paytm.com/api/a/flights/v1/get_fares?source=${fromLocation}&destination=${toLocation}&start_date=${startDate}&class=E&adults=1&client=web`
//         : `https://travel.paytm.com/api/a/flights/v1/get_roundtrip_fares?source=${fromLocation}&destination=${toLocation}&start_date=${startDate}&end_date=${endDate}&class=E&adults=1&client=web`;

//     const response = await fetch(apiUrl);
//     const prices = await response.json();

//     return NextResponse.json({ sucess: true, prices }, { status: 200 });
//   } catch (error) {
//     console.error("Error details:", error); // Log the error details
//     return NextResponse.json(
//       { error: "Internal Server Error", details: error.message }, // Include error details for debugging
//       { status: 500 }
//     );
//   }
// }
//Get the session from the request
// Counts the User’s Searches and Ensures the Limit Is Not Exceeded
// Logs the Search Details in the database
// Fetches Flight Prices from the Paytm Flights API

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received request body:", body);

    const { fromLocation, toLocation, startDate, endDate, tripType } = body;

    // Validate required fields
    if (!fromLocation || !toLocation || !startDate || !tripType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Build API URL with proper encoding
    const apiUrl =
      tripType === "oneway"
        ? `https://travel.paytm.com/api/a/flights/v1/get_fares?source=${encodeURIComponent(
            fromLocation
          )}&destination=${encodeURIComponent(
            toLocation
          )}&start_date=${encodeURIComponent(
            startDate
          )}&class=E&adults=1&client=web`
        : `https://travel.paytm.com/api/a/flights/v1/get_roundtrip_fares?source=${encodeURIComponent(
            fromLocation
          )}&destination=${encodeURIComponent(
            toLocation
          )}&start_date=${encodeURIComponent(
            startDate
          )}&end_date=${encodeURIComponent(
            endDate
          )}&class=E&adults=1&client=web`;

    // Make the request with proxy headers
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        Origin: "https://travel.paytm.com",
        Referer: "https://travel.paytm.com/",
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const prices = await response.json();

    return NextResponse.json({ success: true, prices });
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        error: "Unable to fetch flight data",
        details: error.message,
        requestInfo: req.url,
      },
      { status: 500 }
    );
  }
}
