// import FlightList from "./FlightList";
// import TotalPrice from "./TotalPrice";

// export default function FlightResults({
//   prices,
//   tripType,
//   fromLocation,
//   toLocation,
// }) {
//   return (
//     <div className="mt-4">
//       <h3 className="text-lg font-semibold mb-2">Flight Prices</h3>

//       <FlightList
//         title={`${fromLocation} to ${toLocation}`}
//         flights={
//           tripType === "oneway" ? prices.body.fares : prices.body.fares.onward
//         }
//         label="Onward"
//       />

//       {tripType === "roundtrip" && prices.body.fares?.return && (
//         <>
//           <TotalPrice
//             onwardFlights={prices.body.fares.onward}
//             returnFlights={prices.body.fares.return}
//           />
//           <FlightList
//             title={`${toLocation} to ${fromLocation}`}
//             flights={prices.body.fares.return}
//             label="Return"
//           />
//         </>
//       )}
//     </div>
//   );
// }

import FlightList from "./FlightList";
import TotalPrice from "./TotalPrice";

export default function FlightResults({
  prices,
  tripType,
  fromLocation,
  toLocation,
}) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Flight Prices</h3>

      {/* Total Price Component */}
      {tripType === "roundtrip" &&
        prices.body.fares?.onward &&
        prices.body.fares?.return && (
          <TotalPrice
            onwardFlights={prices.body.fares.onward}
            returnFlights={prices.body.fares.return}
          />
        )}

      {/* Container for Onward and Return Flight Lists */}
      <div className="flex flex-col md:flex-row md:space-x-4">
        {/* Onward Flights */}
        <div className="flex-1 mb-4">
          <FlightList
            title={`${fromLocation} to ${toLocation}`}
            flights={prices.body.fares.onward}
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
