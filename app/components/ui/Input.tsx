import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = "",
  id,
  ...props
}) => {
  const inputId = id || props.name || Math.random().toString(36).substr(2, 9);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-bold text-stone-600 mb-2 uppercase tracking-widest"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          flex h-12 w-full rounded-none border border-dashed border-stone-400 bg-white px-4 py-2 text-sm placeholder:text-stone-400 
          focus:outline-none focus:ring-2 focus:ring-fillo-500 focus:border-transparent focus:border-solid disabled:cursor-not-allowed disabled:opacity-50 transition-all
          ${error ? "border-red-500 focus:ring-red-500" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {!error && helperText && (
        <p className="mt-1 text-xs text-stone-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
