import { findCheapestFlight } from "@/utils/flightUtils";
import { Sparkles, ArrowRight } from "lucide-react";

export default function TotalPrice({ onwardFlights, returnFlights }) {
  const cheapestOnward = findCheapestFlight(onwardFlights);
  const cheapestReturn = findCheapestFlight(returnFlights);

  if (!cheapestOnward || !cheapestReturn) return null;

  const totalPrice = cheapestOnward.flight.fare + cheapestReturn.flight.fare;

  return (
    <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-xl p-6 shadow-xl mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-yellow-400" size={20} />
        <h4 className="text-xl font-bold text-white">Best Round Trip Deal</h4>
      </div>

      <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-3">
            {/* Onward Flight */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Sparkles className="text-purple-400" size={16} />
              </div>
              <div>
                <p className="text-gray-300 text-sm">Onward Flight</p>
                <p className="text-white font-medium">
                  {cheapestOnward.flight.airline?.replace("+", " ")} - ₹
                  {cheapestOnward.flight.fare.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* Return Flight */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-500/20 rounded-lg">
                <ArrowRight className="text-pink-400" size={16} />
              </div>
              <div>
                <p className="text-gray-300 text-sm">Return Flight</p>
                <p className="text-white font-medium">
                  {cheapestReturn.flight.airline?.replace("+", " ")} - ₹
                  {cheapestReturn.flight.fare.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <div className="bg-white/10 rounded-lg px-6 py-3">
              <p className="text-gray-300 text-sm">Total Price</p>
              <p className="text-2xl font-bold text-white">
                ₹{totalPrice.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
