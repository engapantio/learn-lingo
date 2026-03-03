import { useState, useRef, useEffect } from "react";

interface DropdownProps {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
  width: number;
}

const Dropdown = ({width, label, value, placeholder, options,onChange}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLFieldSetElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if(!ref.current) return;
      if(!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [])
  
  return (
    <fieldset className="relative flex flex-col gap-2" ref={ref}>
      {label && (
        <label className="block leading-[1.29] text-sm font-medium text-text-grey">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`block w-${width} h-12 flex items-center justify-between px-4 pl-4 border-none font-medium text-bg-dark leading-[1.11] text-lg rounded-[14px] bg-white  hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transform transition-transform cursor-pointer ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 7l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className={`block w-${width} h-12 flex items-center justify-between px-4 pl-4 border-none font-medium text-bg-dark leading-[1.11] text-lg rounded-[14px] bg-white  hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            — All —
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-${width} text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                opt === value ? "bg-blue-50 text-blue-600" : "text-gray-800"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </fieldset>
  )

}

export default Dropdown;