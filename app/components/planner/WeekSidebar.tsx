"use client";

import { Plus, Copy, Trash2, FileText, Download, Loader2 } from "lucide-react";
import clsx from "clsx";
import { WeekConfig } from "@/app/types";

interface WeekSidebarProps {
  weeks: WeekConfig[];
  activeWeekId: string | null;
  setActiveWeek: (id: string) => void;
  addWeek: () => void;
  duplicateWeek: (id: string) => void;
  removeWeek: (id: string) => void;
  onExport: () => void;
  isExporting: boolean;
}

export const WeekSidebar = ({
  weeks,
  activeWeekId,
  setActiveWeek,
  addWeek,
  duplicateWeek,
  removeWeek,
  onExport,
  isExporting,
}: WeekSidebarProps) => {
  return (
    <nav className="w-64 bg-white border-r border-stone-200 flex flex-col shrink-0 z-20 h-full">
      <div className="p-6 border-b border-stone-100 flex items-center justify-between shrink-0 h-[88px]">
        <div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight font-serif">
            Timeline
          </h2>
          <p className="text-xs text-stone-500 font-medium mt-0.5">
            Manage Schedule
          </p>
        </div>
        <button
          onClick={addWeek}
          className="w-8 h-8 flex items-center justify-center bg-stone-50 hover:bg-fillo-50 border border-stone-200 hover:border-fillo-200 text-stone-400 hover:text-fillo-600 transition-colors"
          title="Add Week"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-stone-50/50">
        {weeks.map((week, idx) => {
          const isActive = activeWeekId === week.id;
          return (
            <div
              key={week.id}
              onClick={() => setActiveWeek(week.id)}
              className={clsx(
                "group relative p-4 border cursor-pointer transition-all duration-200 select-none bg-white",
                isActive
                  ? "border-fillo-600 shadow-md z-10"
                  : "border-stone-200 hover:border-stone-300 hover:shadow-sm",
              )}
            >
              {/* Active Indicator Strip */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-fillo-600" />
              )}

              <div className="flex justify-between items-start mb-2">
                <span
                  className={clsx(
                    "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border",
                    isActive
                      ? "bg-fillo-50 text-fillo-700 border-fillo-100"
                      : "bg-stone-50 text-stone-500 border-stone-100",
                  )}
                >
                  Week {week.weekNumber ?? idx + 1}
                </span>

                {/* Actions (Hover) */}
                <div
                  className={clsx(
                    "flex gap-1 transition-opacity",
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100",
                  )}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateWeek(week.id);
                    }}
                    className="p-1 text-stone-400 hover:text-fillo-600 transition-colors"
                    title="Duplicate Week"
                  >
                    <Copy size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeWeek(week.id);
                    }}
                    className="p-1 text-stone-400 hover:text-red-500 transition-colors"
                    title="Delete Week"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div
                className={clsx(
                  "font-bold text-sm mb-3 truncate",
                  isActive ? "text-stone-900" : "text-stone-600",
                )}
              >
                {week.label}
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-400 font-medium">
                <FileText size={12} />
                <span>
                  {week.pages.length}{" "}
                  {week.pages.length === 1 ? "Page" : "Pages"}
                </span>
              </div>
            </div>
          );
        })}

        {weeks.length === 0 && (
          <div className="text-center p-8 text-stone-400 border border-dashed border-stone-200 bg-white">
            <p className="text-xs">No weeks added.</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-stone-200 bg-stone-50">
        <button
          onClick={onExport}
          disabled={isExporting}
          className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white py-2.5 px-4 font-bold text-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm active:translate-y-0.5"
        >
          {isExporting ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Download size={16} />
              <span>Export PDF</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
};
