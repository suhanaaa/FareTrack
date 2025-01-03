export default function DateInput({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        type="date"
        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg 
                 focus:ring-2 focus:ring-purple-500 focus:border-transparent
                 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
