export default function TripTypeSelect({ value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Trip Type</label>
      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option className="" value="oneway">
          One Way
        </option>
        <option value="roundtrip">Round Trip</option>
      </select>
    </div>
  );
}
