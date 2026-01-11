import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "group inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-none uppercase text-xs md:text-sm";

  const variants = {
    primary:
      "bg-fillo-600 text-white hover:bg-fillo-700 focus:ring-fillo-500 shadow-sm",
    secondary:
      "bg-stone-200 text-stone-900 hover:bg-stone-300 focus:ring-stone-400",
    outline:
      "border border-dashed border-stone-400 bg-transparent text-stone-700 hover:bg-stone-50 focus:ring-stone-400 hover:border-solid hover:border-fillo-600 hover:text-fillo-700",
    ghost:
      "bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900",
    link: "bg-transparent text-fillo-600 hover:underline p-0 h-auto normal-case",
  };

  const sizes = {
    sm: "h-8 px-4",
    md: "h-11 px-6",
    lg: "h-14 px-10",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${
        variant !== "link" ? sizes[size] : ""
      } ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && leftIcon && (
        <span className="mr-2 transition-transform group-hover:-translate-x-1">
          {leftIcon}
        </span>
      )}
      {children}
      {!isLoading && rightIcon && (
        <span className="ml-2 transition-transform group-hover:translate-x-1">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
