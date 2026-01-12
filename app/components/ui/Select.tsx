import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import clsx from "clsx";

export interface SelectOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = "Select...",
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={clsx("relative w-full", className)} ref={containerRef}>
      {label && (
        <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">
          {label}
        </label>
      )}
      <div
        className={clsx(
          "flex items-center justify-between w-full px-3 py-2 bg-white border rounded-none cursor-pointer transition-all duration-200",
          isOpen
            ? "border-fillo-500 ring-1 ring-fillo-500"
            : "border-stone-200 hover:border-stone-300"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {selectedOption?.icon && (
            <span className="text-stone-400">{selectedOption.icon}</span>
          )}
          <span
            className={clsx(
              "text-xs font-medium truncate",
              selectedOption ? "text-stone-700" : "text-stone-400"
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          size={14}
          className={clsx(
            "text-stone-400 transition-transform duration-200 shrink-0",
            isOpen && "transform rotate-180"
          )}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-stone-100 rounded-none shadow-lg max-h-60 overflow-auto animate-in fade-in zoom-in-95 duration-100">
          <div className="p-1">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <div
                  key={option.value}
                  className={clsx(
                    "flex items-center gap-2 px-3 py-2 text-xs rounded-none cursor-pointer transition-colors",
                    isSelected
                      ? "bg-fillo-50 text-fillo-700"
                      : "text-stone-600 hover:bg-stone-50"
                  )}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.icon && (
                    <span
                      className={clsx(
                        isSelected ? "text-fillo-500" : "text-stone-400"
                      )}
                    >
                      {option.icon}
                    </span>
                  )}
                  <span className="flex-1 font-medium">{option.label}</span>
                  {isSelected && <Check size={12} className="text-fillo-600" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
