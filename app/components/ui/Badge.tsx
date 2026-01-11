import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "neutral" | "brand" | "success" | "warning" | "error";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  className = "",
}) => {
  const variants = {
    neutral: "bg-stone-50 text-stone-600 border-stone-300",
    brand: "bg-fillo-50 text-fillo-800 border-fillo-300",
    success: "bg-green-50 text-green-700 border-green-300",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-300",
    error: "bg-red-50 text-red-700 border-red-300",
  };

  return (
    <span
      className={`inline-flex items-center rounded-none border border-dashed px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
