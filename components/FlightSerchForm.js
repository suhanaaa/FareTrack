"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const findCheapestFlight = (flights) => {
  if (!flights) return null;

  return Object.entries(flights)
    .filter(([_, flight]) => flight && !flight.noFlights && flight.fare)
    .reduce((cheapest, [date, flight]) => {
      if (!cheapest || flight.fare < cheapest.flight.fare) {
        return { date, flight };
      }
      return cheapest;
    }, null);
};

export default function FlightSearchForm() {
  // State to hold form data
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tripType, setTripType] = useState("oneway");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [prices, setPrices] = useState(null);
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) return;
    setIsLoading(true);
    setError("");
    setPrices(null);

    try {
      // Prepare the data to send to the backend API
      const requestData = {
        tripType,
        fromLocation,
        toLocation,
        startDate,
        endDate: tripType === "roundtrip" ? endDate : null,
      };

      // Send form data to the backend using axios
      const response = await axios.post("/api/flight-search", requestData);

      if (response.status === 200 && response.data.prices?.body?.fares) {
        setPrices(response.data.prices);
        console.log("API Response:", response.data.prices);
        toast.success("Flights found!");
      } else {
        throw new Error("Invalid response format");
      }

      router.refresh();
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "No flights found for this route";

      setError(errorMessage);
      setPrices(null); // Clear previous results

      // Show error message
      toast.error(errorMessage);
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  // boom;
  return (
    <div className="p-6 border rounded-lg shadow-lg bg-white max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Search Flights</h2>

      {/* Trip Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Trip Type</label>
        <select
          className="w-full px-3 py-2 border rounded-lg"
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
        >
          <option value="oneway">One Way</option>
          <option value="roundtrip">Round Trip</option>
        </select>
      </div>

      {/* Origin */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">From</label>
        <input
          type="text"
          placeholder="Origin (e.g., IXS)"
          className="w-full px-3 py-2 border rounded-lg"
          value={fromLocation}
          onChange={(e) => setFromLocation(e.target.value)}
        />
      </div>

      {/* Destination */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">To</label>
        <input
          type="text"
          placeholder="Destination (e.g., GAU)"
          className="w-full px-3 py-2 border rounded-lg"
          value={toLocation}
          onChange={(e) => setToLocation(e.target.value)}
        />
      </div>

      {/* Start Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Departure Date</label>
        <input
          type="date"
          className="w-full px-3 py-2 border rounded-lg"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      {/* End Date */}
      {tripType === "roundtrip" && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Return Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-lg"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Search Flights
      </button>

      {/* Error Message */}
      {error && <div className="text-red-600 mt-4">{error}</div>}

      {/* Display Flight Prices */}
      {prices?.body?.fares && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Flight Prices</h3>

          {/* Onward Flights */}
          <div className="mb-4">
            <h4 className="text-md font-medium mb-2">
              {fromLocation} to {toLocation}
            </h4>

            {/* Cheapest Flight */}
            {(() => {
              const flightData =
                tripType === "oneway"
                  ? prices.body.fares
                  : prices.body.fares.onward;

              const cheapestFlight = findCheapestFlight(flightData);

              return cheapestFlight ? (
                <div className="mb-4">
                  <p className="text-green-600 font-semibold mb-2">
                    Cheapest Flight:
                  </p>
                  <div className="border-2 border-green-500 p-2 rounded">
                    <p>Date: {cheapestFlight.date}</p>
                    <p className="text-lg font-bold text-green-600">
                      Fare: ₹{cheapestFlight.flight.fare}
                    </p>
                    <p>
                      Airline:{" "}
                      {cheapestFlight.flight.airline || "Not available"}
                    </p>
                    <p>
                      Last Updated:{" "}
                      {cheapestFlight.flight.updated_at || "Not available"}
                    </p>
                  </div>
                </div>
              ) : null;
            })()}

            {/* All Available Flights */}
            <p className="font-medium mb-2">All Available Flights:</p>
            <ul className="space-y-2">
              {(() => {
                const flightData =
                  tripType === "oneway"
                    ? prices.body.fares
                    : prices.body.fares.onward;

                return flightData
                  ? Object.entries(flightData)
                      .filter(
                        ([_, flight]) =>
                          flight && !flight.noFlights && flight.fare
                      )
                      .map(([date, flight]) => (
                        <li key={date} className="border p-2 rounded">
                          <p>Date: {date}</p>
                          <p>Fare: ₹{flight.fare}</p>
                          <p>Airline: {flight.airline || "Not available"}</p>
                          <p>
                            Last Updated: {flight.updated_at || "Not available"}
                          </p>
                        </li>
                      ))
                  : null;
              })()}
            </ul>
            {(() => {
              const flightData =
                tripType === "oneway"
                  ? prices.body.fares
                  : prices.body.fares.onward;

              return (
                (!flightData ||
                  Object.values(flightData).every(
                    (flight) => !flight || flight.noFlights
                  )) && (
                  <p className="text-gray-500 italic">
                    No flights available for this route
                  </p>
                )
              );
            })()}
          </div>

          {/* Return Flights (only show if roundtrip) */}
          {tripType === "roundtrip" && prices.body.fares?.return && (
            <div>
              <h4 className="text-md font-medium mb-2">
                {toLocation} to {fromLocation}
              </h4>

              {/* Cheapest Return Flight */}
              {(() => {
                const cheapestFlight = findCheapestFlight(
                  prices.body.fares.return
                );

                return cheapestFlight ? (
                  <div className="mb-4">
                    <p className="text-green-600 font-semibold mb-2">
                      Cheapest Return Flight:
                    </p>
                    <div className="border-2 border-green-500 p-2 rounded">
                      <p>Date: {cheapestFlight.date}</p>
                      <p className="text-lg font-bold text-green-600">
                        Fare: ₹{cheapestFlight.flight.fare}
                      </p>
                      <p>
                        Airline:{" "}
                        {cheapestFlight.flight.airline || "Not available"}
                      </p>
                      <p>
                        Last Updated:{" "}
                        {cheapestFlight.flight.updated_at || "Not available"}
                      </p>
                    </div>
                  </div>
                ) : null;
              })()}

              {/* All Available Return Flights */}
              <p className="font-medium mb-2">All Available Return Flights:</p>
              <ul className="space-y-2">
                {Object.entries(prices.body.fares.return)
                  .filter(
                    ([_, flight]) => flight && !flight.noFlights && flight.fare
                  )
                  .map(([date, flight]) => (
                    <li key={date} className="border p-2 rounded">
                      <p>Date: {date}</p>
                      <p>Fare: ₹{flight.fare}</p>
                      <p>Airline: {flight.airline || "Not available"}</p>
                      <p>
                        Last Updated: {flight.updated_at || "Not available"}
                      </p>
                    </li>
                  ))}
              </ul>
              {(!prices.body.fares.return ||
                Object.values(prices.body.fares.return).every(
                  (flight) => !flight || flight.noFlights
                )) && (
                <p className="text-gray-500 italic">
                  No return flights available for this route
                </p>
              )}
            </div>
          )}

          {/* Total Price for Round Trip */}
          {tripType === "roundtrip" &&
            (() => {
              const cheapestOnward = findCheapestFlight(
                prices.body.fares.onward
              );
              const cheapestReturn = findCheapestFlight(
                prices.body.fares.return
              );

              if (cheapestOnward && cheapestReturn) {
                const totalPrice =
                  cheapestOnward.flight.fare + cheapestReturn.flight.fare;
                return (
                  <div className="mt-4 p-3 bg-green-50 border-2 border-green-500 rounded">
                    <p className="text-lg font-bold text-green-700">
                      Cheapest Round Trip Total: ₹{totalPrice}
                    </p>
                    <p className="text-sm text-green-600">
                      (Onward: ₹{cheapestOnward.flight.fare} + Return: ₹
                      {cheapestReturn.flight.fare})
                    </p>
                  </div>
                );
              }
              return null;
            })()}
        </div>
      )}
    </div>
  );
}
