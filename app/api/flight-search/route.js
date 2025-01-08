import { auth } from "@/auth";
import { NextResponse } from "next/server";
import Search from "@/models/Search";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json();

    //Get the session from the request
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    //destructing the required data
    const { tripType, fromLocation, toLocation, startDate, endDate } = body;

    //validating the necessary fields
    if (
      !tripType ||
      !fromLocation ||
      !toLocation ||
      !startDate ||
      (tripType === "roundtrip" && !endDate)
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectMongo();

    // Count the number of searches made by the logged-in user
    const count = await Search.countDocuments({ userId: session.user.id });

    console.log("Search Count:", count);

    // Check if the user has exceeded the search limit of 50
    if (count >= 500) {
      return NextResponse.json(
        { error: "Search limit reached, ugrade the plan" },
        { status: 403 }
      );
    }

    // Log the user's search in the database
    await Search.create({
      userId: session.user.id,
      tripType,
      fromLocation,
      toLocation,
      startDate,
      endDate: tripType === "roundtrip" ? endDate : null,
    });

    // Build the URL for the Paytm API based on trip type (oneway or roundtrip)
    const apiUrl =
      tripType === "oneway"
        ? `https://travel.paytm.com/api/a/flights/v1/get_fares?source=${fromLocation}&destination=${toLocation}&start_date=${startDate}&class=E&adults=1&client=web`
        : `https://travel.paytm.com/api/a/flights/v1/get_roundtrip_fares?source=${fromLocation}&destination=${toLocation}&start_date=${startDate}&end_date=${endDate}&class=E&adults=1&client=web`;

    // Build the URL for the Paytm API based on trip type (oneway or roundtrip)
    // const apiUrl =
    //   tripType === "oneway"
    //     ? `https://flightsapi.shinealom.workers.dev/api/a/flights/v1/get_roundtrip_fares?source=${fromLocation}&destination=${toLocation}&start_date=${startDate}&class=E&adults=1&client=web`
    //     : `https://flightsapi.shinealom.workers.dev/api/a/flights/v1/get_roundtrip_fares?source=${fromLocation}&destination=${toLocation}&start_date=${startDate}&end_date=${endDate}&class=E&adults=1&client=web`;

    const response = await fetch(apiUrl);
    const prices = await response.json();

    return NextResponse.json({ sucess: true, prices }, { status: 200 });
  } catch (error) {
    console.error("Error details:", error); // Log the error details
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message }, // Include error details for debugging
      { status: 500 }
    );
  }
}
//Get the session from the request
// Counts the User’s Searches and Ensures the Limit Is Not Exceeded
// Logs the Search Details in the database
// Fetches Flight Prices from the Paytm Flights API
