import { findCheapestFlight } from "@/utils/flightUtils";
import FlightCard from "./FlightCard";
import { ArrowUpDown, Plane } from "lucide-react";

export default function FlightList({ title, flights, label }) {
  // Debug logging
  console.log("FlightList Debug:", {
    title,
    flights,
    hasFlights: flights && typeof flights === "object",
    flightsEntries: flights ? Object.entries(flights) : [],
  });

  if (!flights || typeof flights !== "object") {
    return (
      <div className="bg-gray-800 rounded-xl p-6">
        <h4 className="text-xl font-medium text-white mb-2">{title}</h4>
        <p className="text-gray-400">
          No {label.toLowerCase()} flights available for this route
        </p>
      </div>
    );
  }

  // Filter valid flights and ensure they have required properties
  const validFlights = Object.entries(flights).filter(([_, flight]) => {
    console.log("Filtering flight:", flight); // Debug log
    return (
      flight &&
      typeof flight === "object" &&
      "fare" in flight &&
      !flight.noFlights
    );
  });

  // Sort flights by fare
  validFlights.sort((a, b) => {
    const fareA = a[1]?.fare || Number.MAX_VALUE;
    const fareB = b[1]?.fare || Number.MAX_VALUE;
    return fareA - fareB;
  });

  const cheapestFlight =
    validFlights.length > 0
      ? {
          date: validFlights[0][0],
          flight: validFlights[0][1],
        }
      : null;

  console.log("Processed Flights:", {
    validFlightsCount: validFlights.length,
    cheapestFlight,
  });

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Plane className="text-purple-500" size={24} />
          <div>
            <h4 className="text-xl font-bold text-white">{title}</h4>
            <p className="text-gray-400 text-sm">
              {validFlights.length} flights available
            </p>
          </div>
        </div>

        {validFlights.length > 0 && (
          <div className="flex items-center gap-2">
            <ArrowUpDown className="text-gray-400" size={16} />
            <select className="bg-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2 border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>Price: Lowest first</option>
              <option>Price: Highest first</option>
              <option>Duration: Shortest</option>
            </select>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {cheapestFlight && (
          <div className="mb-6">
            <p className="text-purple-400 font-medium mb-3">
              Best {label} Option
            </p>
            <FlightCard
              date={cheapestFlight.date}
              flight={cheapestFlight.flight}
              highlighted
            />
          </div>
        )}

        {validFlights.length > 0 ? (
          <div className="space-y-4">
            {validFlights.map(([date, flight]) => (
              <FlightCard key={date} date={date} flight={flight} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-4">
            No {label.toLowerCase()} flights available for this route
          </p>
        )}
      </div>
    </div>
  );
}
