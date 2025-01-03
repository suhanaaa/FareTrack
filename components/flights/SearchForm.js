// "use client";
// import { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import TripTypeSelect from "./TripTypeSelect";
// import LocationInput from "./LocationInput";
// import DateInput from "./DateInput";
// import FlightResults from "./FlightResults";

// export default function SearchForm() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [tripType, setTripType] = useState("oneway");
//   const [fromLocation, setFromLocation] = useState("");
//   const [toLocation, setToLocation] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [prices, setPrices] = useState(null);
//   const [error, setError] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Validate inputs
//     if (
//       !fromLocation ||
//       !toLocation ||
//       !startDate ||
//       (tripType === "roundtrip" && !endDate)
//     ) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     if (isLoading) return;
//     setIsLoading(true);
//     setError("");
//     setPrices(null);

//     try {
//       const requestData = {
//         tripType,
//         fromLocation, // This will be the airport code
//         toLocation, // This will be the airport code
//         startDate,
//         endDate: tripType === "roundtrip" ? endDate : null,
//       };

//       const response = await axios.post("/api/flight-search", requestData);

//       if (response.status === 200 && response.data.prices?.body?.fares) {
//         setPrices(response.data.prices);
//         toast.success("Flights found!");
//       } else {
//         throw new Error("Invalid response format");
//       }

//       router.refresh();
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.error ||
//         error.message ||
//         "No flights found for this route";

//       setError(errorMessage);
//       setPrices(null);
//       toast.error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <section className="max-w-5xl mx-auto px-5 flex flex-col md:flex-row md:items-start gap-8 pb-12">
//       <div className="bg-base-100 p-8 rounded-3xl space-y-8 max-w-md mx-auto">
//         <h2 className="text-xl font-semibold mb-4 text-center">
//           Search Flights
//         </h2>

//         <TripTypeSelect value={tripType} onChange={setTripType} />

//         <LocationInput
//           label="From"
//           placeholder="Enter city or airport code"
//           value={fromLocation}
//           onChange={setFromLocation}
//         />

//         <LocationInput
//           label="To"
//           placeholder="Enter city or airport code"
//           value={toLocation}
//           onChange={setToLocation}
//         />

//         <DateInput
//           label="Departure Date"
//           value={startDate}
//           onChange={setStartDate}
//         />

//         {tripType === "roundtrip" && (
//           <DateInput
//             label="Return Date"
//             value={endDate}
//             onChange={setEndDate}
//           />
//         )}

//         <button
//           className="w-full px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-800 disabled:bg-purple-300 transition duration-200"
//           onClick={handleSubmit}
//           disabled={isLoading}
//         >
//           {isLoading ? "Searching..." : "Search Flights"}
//         </button>

//         {error && <div className="text-red-600 mt-4">{error}</div>}
//       </div>
//       <div className="space-y-4 flex-grow">
//         {prices?.body?.fares && (
//           <FlightResults
//             prices={prices}
//             tripType={tripType}
//             fromLocation={fromLocation}
//             toLocation={toLocation}
//           />
//         )}
//       </div>
//     </section>
//   );
// }

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

    if (isLoading) return;
    setIsLoading(true);
    setError("");
    setPrices(null);

    try {
      const requestData = {
        tripType,
        fromLocation,
        toLocation,
        startDate,
        endDate: tripType === "roundtrip" ? endDate : null,
      };

      const response = await axios.post("/api/flight-search", requestData);

      if (response.status === 200 && response.data.prices?.body?.fares) {
        setPrices(response.data.prices);
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
      setPrices(null);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Fixed Search Form */}
      <div className="bg-base-100 p-8 rounded-3xl space-y-8 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Search Flights
        </h2>

        <TripTypeSelect value={tripType} onChange={setTripType} />

        <LocationInput
          label="From"
          placeholder="Enter city or airport code"
          value={fromLocation}
          onChange={setFromLocation}
        />

        <LocationInput
          label="To"
          placeholder="Enter city or airport code"
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
          className="w-full px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-800 disabled:bg-purple-300 transition duration-200"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search Flights"}
        </button>

        {error && <div className="text-red-600 mt-4">{error}</div>}
      </div>

      {/* Scrollable Results Area */}
      <div className="flex-grow overflow-y-auto p-4 ">
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
