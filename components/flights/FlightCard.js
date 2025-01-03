export default function FlightCard({ date, flight, highlighted = false }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Add null check for flight and fare
  if (!flight || flight.fare === null) {
    return null;
  }

  return (
    <div className="pt-3">
      <div
        className={`
          relative rounded-lg transition-all duration-300 hover:-translate-y-1
          ${
            highlighted
              ? "bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-purple-500/30"
              : "bg-gray-800/50 border border-gray-700/30"
          }
          backdrop-blur-sm shadow-lg group min-h-[160px]
        `}
      >
        {highlighted && (
          <div className="absolute -top-3 left-4 bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-0.5 rounded-full text-xs font-medium text-white shadow-lg z-10">
            Best Deal
          </div>
        )}

        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div>
                <p className="text-gray-400 text-sm">{formattedDate}</p>
                <div className="mt-0.5">
                  <span
                    className={`text-xl font-bold ${
                      highlighted ? "text-purple-300" : "text-gray-200"
                    }`}
                  >
                    ₹{flight?.fare?.toLocaleString("en-IN") || "N/A"}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">per person</span>
                </div>
              </div>

              <div>
                <p
                  className={`text-base font-medium ${
                    highlighted ? "text-gray-200" : "text-gray-300"
                  }`}
                >
                  {flight.airline || "Airline TBD"}
                </p>
                <p className="text-xs text-gray-500">
                  Last updated: {flight.updated_at || "Recently"}
                </p>
              </div>
            </div>

            <button
              className={`
    px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200
    ${
      highlighted
        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
        : "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-300 hover:from-purple-600/30 hover:to-pink-600/30"
    }
    shadow-sm hover:shadow whitespace-nowrap ml-4 self-start mt-1
  `}
            >
              Select Flight
            </button>
          </div>

          <div className="absolute inset-0 border border-transparent group-hover:border-purple-500/20 rounded-lg transition-all duration-300" />
        </div>
      </div>
    </div>
  );
}
