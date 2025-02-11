import { useState } from "react";

interface SelectProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Select({ options, onChange, placeholder = "Select an option" }: SelectProps) {
  const [selected, setSelected] = useState("");

  return (
    <div className="relative w-full">
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          onChange(e.target.value);
        }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
