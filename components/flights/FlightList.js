import { findCheapestFlight } from "@/utils/flightUtils";
import FlightCard from "./FlightCard";

export default function FlightList({ title, flights, label }) {
  console.log("FlightList Debug:", {
    flights,
    isObject: typeof flights === "object",
    flightsLength: flights ? Object.keys(flights).length : 0,
  });

  if (!flights || typeof flights !== "object") {
    console.log("First condition failed:", { flights, type: typeof flights });
    return (
      <div className="mb-4">
        <h4 className="text-md font-medium mb-2">{title}</h4>
        <p className="text-gray-500 italic">
          No {label.toLowerCase()} flights available for this route
        </p>
      </div>
    );
  }

  const cheapestFlight = findCheapestFlight(flights);
  const validFlights = Object.entries(flights).filter(
    ([_, flight]) => flight && !flight.noFlights && flight.fare
  );

  console.log("Filtered flights:", {
    totalFlights: Object.keys(flights).length,
    validFlightsCount: validFlights.length,
    validFlights,
    cheapestFlight,
  });

  // Sort flights by fare to ensure the cheapest is at the top
  validFlights.sort((a, b) => a[1].fare - b[1].fare);

  return (
    <div className="mb-4">
      <h4 className="text-xl font-bold mb-2 mt-6">{title}</h4>

      {cheapestFlight && (
        <div className="mb-4">
          <p className="text-purple-200 font-semibold mb-2">
            Cheapest {label} Flight:
          </p>
          <FlightCard
            date={cheapestFlight.date}
            flight={cheapestFlight.flight}
            highlighted
          />
        </div>
      )}

      <p className="font-medium mb-2">All Available {label} Flights:</p>

      {validFlights.length > 0 ? (
        <ul className="space-y-2">
          {validFlights.map(([date, flight]) => (
            <FlightCard key={date} date={date} flight={flight} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">
          No {label.toLowerCase()} flights available for this route
        </p>
      )}
    </div>
  );
}
