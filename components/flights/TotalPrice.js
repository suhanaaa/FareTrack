import { findCheapestFlight } from "@/utils/flightUtils";

export default function TotalPrice({ onwardFlights, returnFlights }) {
  const cheapestOnward = findCheapestFlight(onwardFlights);
  const cheapestReturn = findCheapestFlight(returnFlights);

  if (!cheapestOnward || !cheapestReturn) return null;

  const totalPrice = cheapestOnward.flight.fare + cheapestReturn.flight.fare;

  return (
    <div className="mt-4 p-4 bg-purple-600 border-2 text-white border-purple-500 rounded-lg shadow-md hover:-translate-y-5 hover:shadow my-4">
      <h4 className="text-lg font-bold text-white">Cheapest Round Trip</h4>
      <div className=" p-3 rounded mt-2 bg-purple-600 shadow-sm">
        <p>
          Onward Flight:{" "}
          <span className="font-semibold text-white">
            {cheapestOnward.flight.airline}
          </span>{" "}
          - ₹{cheapestOnward.flight.fare}
        </p>
        <p>
          Return Flight:{" "}
          <span className="font-semibold">{cheapestReturn.flight.airline}</span>{" "}
          - ₹{cheapestReturn.flight.fare}
        </p>
        <p className="font-bold">Total: ₹{totalPrice}</p>
      </div>
    </div>
  );
}
