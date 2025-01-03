"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FlightResults from "./FlightResults";
import TripTypeSelect from "./TripTypeSelect";
import LocationInput from "./LocationInput";
import DateInput from "./DateInput";

export default function SearchForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [tripType, setTripType] = useState("oneway");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [prices, setPrices] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setPrices(null);

    try {
      // Log the request data
      console.log("Request Data:", {
        fromLocation,
        toLocation,
        startDate,
        endDate,
        tripType,
      });

      const response = await axios.post("/api/flight-search", {
        fromLocation,
        toLocation,
        startDate,
        endDate,
        tripType,
      });

      // Log the full response
      console.log("API Response:", response.data);

      if (response.data?.prices?.body?.fares) {
        const flightData = {
          body: {
            fares: response.data.prices.body.fares,
          },
        };

        console.log("Setting prices state:", flightData);
        setPrices(flightData);
        toast.success("Flights found!");
      } else {
        setError("No flights found for this route");
      }
    } catch (error) {
      console.error("Search error details:", {
        message: error.message,
        response: error.response,
        data: error.response?.data,
      });

      // More specific error messages
      if (error.response?.status === 404) {
        setError("No flights found for this route");
      } else if (error.response?.status === 400) {
        setError("Please check your search criteria");
      } else {
        setError("Unable to search flights. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-8">
      {/* Search Form */}
      <div className="w-full lg:w-1/3">
        <div className="bg-gray-800 rounded-xl shadow-xl p-6 sticky top-24">
          <h2 className="text-2xl font-bold text-white mb-6">
            Find Your Flight
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TripTypeSelect value={tripType} onChange={setTripType} />

            <LocationInput
              label="From"
              placeholder="Enter city or airport"
              value={fromLocation}
              onChange={setFromLocation}
            />

            <LocationInput
              label="To"
              placeholder="Enter city or airport"
              value={toLocation}
              onChange={setToLocation}
            />

            <DateInput
              label="Departure Date"
              value={startDate}
              onChange={setStartDate}
            />

            {tripType === "roundtrip" && (
              <DateInput
                label="Return Date"
                value={endDate}
                onChange={setEndDate}
              />
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? "Searching..." : "Search Flights"}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Results Area */}
      <div className="w-full lg:w-2/3">
        {prices?.body?.fares && (
          <FlightResults
            prices={prices}
            tripType={tripType}
            fromLocation={fromLocation}
            toLocation={toLocation}
          />
        )}
      </div>
    </div>
  );
}
