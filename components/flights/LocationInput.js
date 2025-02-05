"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import airportsData from "@/public/airport.json";

// Move data processing outside component and memoize it
const processedAirports = Object.entries(airportsData.airports[0] || {}).reduce(
  (acc, [code, details]) => {
    acc[code.toLowerCase()] = {
      code,
      ...details,
      searchString:
        `${details.city} ${details.state} ${details.name} ${details.iata} ${details.icao}`.toLowerCase(),
    };
    return acc;
  },
  {}
);

export default function LocationInput({ label, placeholder, value, onChange }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCode, setSelectedCode] = useState(value || "");
  const wrapperRef = useRef(null);

  // Debounce search to prevent excessive filtering
  const debouncedSearch = useCallback((searchValue) => {
    if (!searchValue) return [];

    const searchLower = searchValue.toLowerCase();
    return Object.values(processedAirports)
      .filter((airport) => airport.searchString.includes(searchLower))
      .slice(0, 10); // Limit results to improve performance
  }, []);

  // Memoize filtered results
  const filteredAirports = useMemo(
    () => debouncedSearch(searchTerm),
    [searchTerm, debouncedSearch]
  );

  // Set initial value
  useEffect(() => {
    if (value) {
      const airport = processedAirports[value.toLowerCase()];
      if (airport) {
        setSearchTerm(
          `${airport.city}, ${airport.state} (${airport.iata || airport.icao})`
        );
      }
    }
  }, [value]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      const input = e.target.value;
      setSearchTerm(input);
      setShowSuggestions(true);

      if (!input) {
        setSelectedCode("");
        onChange("");
      }
    },
    [onChange]
  );

  const handleAirportSelect = useCallback(
    (airport) => {
      const displayCode = airport.iata || airport.icao;
      setSearchTerm(`${airport.city}, ${airport.state} (${displayCode})`);
      setSelectedCode(displayCode);
      onChange(displayCode);
      setShowSuggestions(false);
    },
    [onChange]
  );

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg 
                 focus:ring-2 focus:ring-purple-500 focus:border-transparent
                 placeholder-gray-400"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
      />

      {showSuggestions && filteredAirports.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {filteredAirports.map((airport) => (
            <li
              key={airport.code}
              className="px-4 py-2 hover:bg-gray-600 cursor-pointer transition-colors duration-150"
              onClick={() => handleAirportSelect(airport)}
            >
              <div className="text-white font-medium">
                {airport.city}, {airport.state} ({airport.iata || airport.icao})
              </div>
              <div className="text-sm text-gray-400">{airport.name}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
