const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />

      {/* Background */}
      <div
        className="
          w-11 h-6 rounded-full
          transition-all duration-300 ease-out
          peer-checked:bg-[#02021A]
          bg-[#D5D7DD]
        "
      ></div>

      {/* Knob */}
      <div
        className="
          absolute left-0 top-0 h-6 w-6
          rounded-full bg-white shadow
          transform transition-all duration-300 ease-out
          peer-checked:translate-x-5
        "
      ></div>
    </label>
  );
};

export default ToggleSwitch;
