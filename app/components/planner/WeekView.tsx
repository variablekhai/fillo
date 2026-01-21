"use client";

import React, { useState } from "react";
import { WeekConfig } from "@/app/types";
import { Calendar as CalendarIcon, LayoutGrid, Plus } from "lucide-react";
import { PageCard } from "./PageCard";
import { RepeatModal } from "./RepeatModal";
import { AIGenerationModal } from "./AIGenerationModal";
import Button from "@/app/components/ui/Button";
import { Sparkles } from "lucide-react";

interface WeekViewProps {
  week: WeekConfig;
  weekIndex: number;
  numPages: number;
  fieldDefinitions: any[];
  fieldValues: any;
  updateFieldValue: any;
  addPageToWeek: any;
  removePageFromWeek: any;
  updateWeek: any;
  onOpenTemplateDrawer: () => void;
}

export const WeekView = ({
  week,
  weekIndex,
  fieldDefinitions,
  fieldValues,
  updateFieldValue,
  addPageToWeek,
  removePageFromWeek,
  updateWeek,
  onOpenTemplateDrawer,
}: WeekViewProps) => {
  const [startDate, setStartDate] = useState(week.startDate || "");
  // Initialize with week.weekNumber if exists, else fallback to index+1
  const [weekNumber, setWeekNumber] = useState(
    week.weekNumber ?? weekIndex + 1,
  );
  const [repeatModalOpenFor, setRepeatModalOpenFor] = useState<string | null>(
    null,
  );
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // Sync internal state if props change (navigating between weeks)
  React.useEffect(() => {
    setStartDate(week.startDate || "");
    setWeekNumber(week.weekNumber ?? weekIndex + 1);
  }, [week.id, week.startDate, week.weekNumber, weekIndex]);

  const handleDateChange = (date: string) => {
    setStartDate(date);
    updateWeek(week.id, { startDate: date });
  };

  const handleWeekNumberChange = (val: string) => {
    const num = parseInt(val);
    if (isNaN(num)) return;
    setWeekNumber(num);

    // Update week config
    updateWeek(week.id, {
      weekNumber: num,
      label: `Week ${num}`,
    });

    // Propagate to all pages
    week.pages.forEach((page) => {
      const fields = fieldDefinitions.filter(
        (f) => f.pageIndex === page.templatePageIndex,
      );
      const weekFields = fields.filter(
        (f) => f.role === "week" || f.name.toLowerCase().includes("week"),
      );

      weekFields.forEach((wf) => {
        updateFieldValue(page.instanceId, wf.id, String(num));
      });
    });
  };

  const handleRepeat = (
    sourcePageInstanceId: string,
    selectedDays: string[],
  ) => {
    const sourcePage = week.pages.find(
      (p) => p.instanceId === sourcePageInstanceId,
    );
    if (!sourcePage) return;

    // Get fields for this template page
    const fields = fieldDefinitions.filter(
      (f) => f.pageIndex === sourcePage.templatePageIndex,
    );

    const dateField = fields.find(
      (f) => f.role === "date" || f.name.toLowerCase().includes("date"),
    );
    const dayField = fields.find(
      (f) => f.role === "day" || f.name.toLowerCase().includes("day"),
    );
    const weekFields = fields.filter(
      (f) => f.role === "week" || f.name.toLowerCase().includes("week"),
    );

    selectedDays.sort(); // Sort by date string

    selectedDays.forEach((targetDateStr) => {
      // Create new instance
      const newInstanceId = addPageToWeek(
        week.id,
        sourcePage.templatePageIndex,
      );

      // Fill fields
      const dateObj = new Date(targetDateStr);
      const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      if (dateField) {
        updateFieldValue(newInstanceId, dateField.id, targetDateStr);
      }
      if (dayField) {
        updateFieldValue(
          newInstanceId,
          dayField.id,
          dayNames[dateObj.getDay()],
        );
      }

      weekFields.forEach((wf) => {
        updateFieldValue(newInstanceId, wf.id, String(weekNumber));
      });
    });

    setRepeatModalOpenFor(null);
  };

  const handleAIGenerate = async (details: string) => {
    try {
      // 1. Prepare data for AI
      // specific fields to process
      const fieldsToGenerate = week.pages.flatMap((page, pageIdx) => {
        // Find fields for this page
        const pageFields = fieldDefinitions.filter(
          (f) => f.pageIndex === page.templatePageIndex,
        );

        return pageFields.map((field) => ({
          identifier: `${page.instanceId}:${field.id}`,
          fieldName: field.name,
          role: field.role,
          pageNumber: pageIdx + 1,
          currentValue: fieldValues[`${page.instanceId}:${field.id}`] || "",
        }));
      });

      const payload = {
        weekDetails: details,
        fieldsToGenerate,
        weekConfig: {
          startDate: startDate,
          weekNumber: weekNumber,
        },
      };

      console.log("Sending to AI:", payload);

      // 2. Call API
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Generation failed");

      const updates = await response.json();
      console.log("AI Response:", updates);

      // 3. Apply updates
      Object.entries(updates).forEach(([key, value]) => {
        // Safe split: find the first colon
        const separatorIndex = key.indexOf(":");
        if (separatorIndex === -1) return;

        const pageInstanceId = key.substring(0, separatorIndex);
        const fieldId = key.substring(separatorIndex + 1);

        if (pageInstanceId && fieldId) {
          updateFieldValue(pageInstanceId, fieldId, value as string);
        }
      });
    } catch (error) {
      console.error("AI Generation error:", error);
      alert("Failed to generate logs. Please try again.");
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-stone-50/30">
      {/* Header */}
      <header className="bg-white px-8 py-8 border-b border-stone-200 shrink-0 flex flex-wrap gap-4 items-end justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-stone-900 font-serif tracking-tight">
              {week.label}
            </h1>
            <span className="bg-stone-100 text-stone-500 text-xs font-bold px-2 py-1 border border-stone-200 uppercase tracking-wider">
              {week.pages.length} Pages
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="bg-transparent border-b border-stone-300 text-stone-700 font-bold focus:border-fillo-600 outline-none pb-1 text-sm font-sans"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                Week No.
              </label>
              <input
                type="number"
                value={weekNumber}
                onChange={(e) => handleWeekNumberChange(e.target.value)}
                className="w-16 bg-transparent border-b border-stone-300 text-stone-700 font-bold focus:border-fillo-600 outline-none pb-1 text-sm font-sans"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsAIModalOpen(true)}
            leftIcon={<Sparkles size={16} className="text-fillo-600" />}
            disabled={week.pages.length === 0}
          >
            AI Autocomplete
          </Button>
          <Button onClick={onOpenTemplateDrawer} leftIcon={<Plus size={18} />}>
            Add Page
          </Button>
        </div>
      </header>

      {/* Pages List */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {week.pages.length === 0 ? (
          <div className="max-w-xl mx-auto mt-20 text-center border-2 border-dashed border-stone-200 p-16 bg-white">
            <LayoutGrid
              className="mx-auto text-stone-300 mb-6"
              size={64}
              strokeWidth={1}
            />
            <h3 className="text-xl font-bold text-stone-900 mb-2 font-serif">
              This week is empty
            </h3>
            <p className="text-stone-500 mb-8 max-w-sm mx-auto">
              Start by adding log pages or forms from your template specific to
              this week.
            </p>
            <Button variant="outline" onClick={onOpenTemplateDrawer}>
              Open Template Library
            </Button>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-6 pb-20">
            {week.pages.map((page, idx) => (
              <PageCard
                key={page.instanceId}
                page={page}
                idx={idx}
                fieldDefinitions={fieldDefinitions}
                fieldValues={fieldValues}
                updateFieldValue={updateFieldValue}
                removePageFromWeek={removePageFromWeek}
                onRepeat={() => setRepeatModalOpenFor(page.instanceId)}
                weekId={week.id}
              />
            ))}
          </div>
        )}
      </div>

      <RepeatModal
        isOpen={!!repeatModalOpenFor}
        onClose={() => setRepeatModalOpenFor(null)}
        weekStartDate={startDate}
        onRepeat={(days) => {
          if (repeatModalOpenFor) handleRepeat(repeatModalOpenFor, days);
        }}
      />

      <AIGenerationModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onGenerate={handleAIGenerate}
      />
    </div>
  );
};
