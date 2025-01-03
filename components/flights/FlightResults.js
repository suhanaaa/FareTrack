import FlightList from "./FlightList";
import TotalPrice from "./TotalPrice";

export default function FlightResults({
  prices,
  tripType,
  fromLocation,
  toLocation,
}) {
  console.log("FlightResults received:", {
    prices,
    tripType,
    flightData:
      tripType === "oneway" ? prices.body.fares : prices.body.fares.onward,
  });

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Flight Prices</h3>

      {tripType === "roundtrip" && prices.body.fares?.return && (
        <TotalPrice
          onwardFlights={prices.body.fares.onward}
          returnFlights={prices.body.fares.return}
        />
      )}

      <div className="flex flex-col md:flex-row md:space-x-4">
        {/* Onward Flights */}
        <div className="flex-1 mb-4">
          <FlightList
            title={`${fromLocation} to ${toLocation}`}
            flights={
              tripType === "oneway"
                ? prices.body.fares
                : prices.body.fares.onward
            }
            label="Onward"
          />
        </div>

        {/* Return Flights */}
        {tripType === "roundtrip" && prices.body.fares?.return && (
          <div className="flex-1 mb-4">
            <FlightList
              title={`${toLocation} to ${fromLocation}`}
              flights={prices.body.fares.return}
              label="Return"
            />
          </div>
        )}
      </div>
    </div>
  );
}
