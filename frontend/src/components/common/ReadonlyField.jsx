const ReadonlyField = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">{label}</label>
    <div className="w-full h-10 bg-[#F3F3F5] rounded-lg px-3 flex items-center text-gray-700 text-sm">
      {value || "—"}
    </div>
  </div>
);

export default ReadonlyField;
