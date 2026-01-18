"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import Button from "@/app/components/ui/Button";
import clsx from "clsx";

interface RepeatModalProps {
  isOpen: boolean;
  onClose: () => void;
  weekStartDate: string;
  onRepeat: (days: string[]) => void;
}

export const RepeatModal = ({
  isOpen,
  onClose,
  weekStartDate,
  onRepeat,
}: RepeatModalProps) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]); // Array of ISO date strings

  if (!isOpen) return null;

  // Generate next 7 days from start date (or today if not set)
  const baseDate = weekStartDate ? new Date(weekStartDate) : new Date();
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);
    return {
      dateStr: d.toISOString().split("T")[0], // yyyy-mm-dd
      dayName: d.toLocaleDateString("en-US", { weekday: "long" }),
      label: d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    };
  });

  const handleToggle = (dateStr: string) => {
    if (selectedDays.includes(dateStr)) {
      setSelectedDays(selectedDays.filter((d) => d !== dateStr));
    } else {
      setSelectedDays([...selectedDays, dateStr]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200 border border-stone-200">
        <div className="px-6 py-5 border-b border-stone-100 bg-stone-50">
          <h3 className="text-lg font-bold text-stone-900 font-serif">
            Repeat Page
          </h3>
          <p className="text-sm text-stone-500 leading-tight mt-1">
            Create copies for specific days.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Select Days
            </p>
            <button
              onClick={() => setSelectedDays(days.map((d) => d.dateStr))}
              className="text-[10px] uppercase font-bold text-fillo-600 hover:underline"
            >
              Select All
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {days.map((day) => {
              const isSelected = selectedDays.includes(day.dateStr);
              return (
                <button
                  key={day.dateStr}
                  onClick={() => handleToggle(day.dateStr)}
                  className={clsx(
                    "flex items-center justify-between px-4 py-3 border transition-all duration-150 group",
                    isSelected
                      ? "bg-fillo-50 border-fillo-500 text-fillo-900 shadow-sm ring-1 ring-fillo-500"
                      : "bg-white border-stone-200 text-stone-600 hover:border-stone-400 hover:bg-stone-50",
                  )}
                >
                  <span className="font-medium text-sm">{day.label}</span>
                  <div
                    className={clsx(
                      "w-4 h-4 border flex items-center justify-center transition-colors",
                      isSelected
                        ? "bg-fillo-600 border-fillo-600 text-white"
                        : "border-stone-300 bg-white group-hover:border-fillo-400",
                    )}
                  >
                    {isSelected && <Check size={12} strokeWidth={4} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="hover:bg-stone-200"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onRepeat(selectedDays)}
            disabled={selectedDays.length === 0}
          >
            Repeat ({selectedDays.length})
          </Button>
        </div>
      </div>
    </div>
  );
};
