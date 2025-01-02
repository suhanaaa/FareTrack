export default function FlightCard({ date, flight, highlighted = false }) {
  const cardClass = highlighted
    ? "border-2 border-purple-600 p-4 rounded-lg shadow-md"
    : "border border-gray-300 p-4 rounded-lg shadow-sm";

  const fareClass = highlighted ? "text-lg font-bold text-purple-300" : "";

  return (
    <li className={cardClass}>
      <p className="text-sm text-gray-400">Date: {date}</p>
      <p className={fareClass}>Fare: ₹{flight.fare}</p>
      <p>Airline: {flight.airline || "Not available"}</p>
      <p className="text-sm text-gray-300">
        Last Updated: {flight.updated_at || "Not available"}
      </p>
    </li>
  );
}
