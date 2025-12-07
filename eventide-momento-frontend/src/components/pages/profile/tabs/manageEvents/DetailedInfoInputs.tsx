"use client";
import { RxCross2 } from "react-icons/rx";

interface DetailedInfoInputsProps {
  value: string[];
  onChange: (values: string[]) => void;
}

const DetailedInfoInputs = ({ value, onChange }: DetailedInfoInputsProps) => {
  const handleInputChange = (index: number, newValue: string) => {
    const updated = [...value];
    updated[index] = newValue;
    onChange(updated);
  };

  const addInput = () => {
    onChange([...value, ""]);
  };

  const removeInput = (index: number) => {
    if (index === 0) return; // first input is mandatory
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-2">
      {value.map((val, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <input
            type="text"
            placeholder={`Detail Information ${idx + 1}`}
            value={val}
            required
            onChange={(e) => handleInputChange(idx, e.target.value)}
            className="flex-1 border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1 rounded"
          />
          {idx !== 0 && (
            <button
              type="button"
              onClick={() => removeInput(idx)}
              className="text-red-500 hover:text-red-700"
            >
              <RxCross2 size={20} />
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addInput}
        className="mt-2 text-sm text-secondary1 hover:underline w-[160px] py-1 px-4 border border-secondary1"
      >
        + Add another
      </button>
    </div>
  );
};

export default DetailedInfoInputs;
