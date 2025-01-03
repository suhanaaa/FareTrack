export default function TripTypeSelect({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Trip Type
      </label>
      <select
        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg 
                 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="oneway">One Way</option>
        <option value="roundtrip">Round Trip</option>
      </select>
    </div>
  );
}
