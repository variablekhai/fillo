"use client";

import { useState } from "react";
import { PageConfig, FieldDefinition } from "../../types";
import { PDFPageThumbnail } from "./PDFPageThumbnail";
import { Repeat, Trash2, ChevronRight } from "lucide-react";
import clsx from "clsx";
import Input from "@/app/components/ui/Input";

interface PageCardProps {
  page: PageConfig;
  idx: number;
  fieldDefinitions: FieldDefinition[];
  fieldValues: Record<string, string>;
  updateFieldValue: (
    pageInstanceId: string,
    fieldId: string,
    value: string,
  ) => void;
  removePageFromWeek: (weekId: string, instanceId: string) => void;
  onRepeat: () => void;
  weekId: string;
}

export const PageCard = ({
  page,
  idx,
  fieldDefinitions,
  fieldValues,
  updateFieldValue,
  removePageFromWeek,
  onRepeat,
  weekId,
}: PageCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const fields = fieldDefinitions.filter(
    (f) => f.pageIndex === page.templatePageIndex,
  );

  // Try to find a "Title" or "Date" to display in the header
  const dateField = fields.find(
    (f) => f.role === "date" || f.name.toLowerCase().includes("date"),
  );
  const dateVal = dateField
    ? fieldValues[`${page.instanceId}:${dateField.id}`]
    : null;

  return (
    <div className="bg-white shadow-sm border border-stone-200 overflow-hidden transition-all hover:shadow-md group">
      {/* Card Header */}
      <div
        className="px-5 py-4 flex items-center justify-between bg-white cursor-pointer select-none border-b border-transparent group-hover:border-stone-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          {/* Mini Thumbnail */}
          <div className="w-10 h-14 bg-white border border-stone-200 shadow-sm overflow-hidden shrink-0 relative">
            <div className="absolute inset-0 pointer-events-none">
              <PDFPageThumbnail pageIndex={page.templatePageIndex} width={40} />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-stone-800 text-sm font-sans">
              {dateVal ? (
                <span className="text-fillo-700 bg-fillo-50 px-2 py-0.5 border border-fillo-100">
                  {dateVal}
                </span>
              ) : (
                `Page ${idx + 1}`
              )}
            </h4>
            <p className="text-xs text-stone-500 mt-1">
              Template Page {page.templatePageIndex + 1}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRepeat();
            }}
            className="p-2 hover:bg-stone-100 hover:text-fillo-600 rounded-none transition-colors text-stone-400 group"
            title="Repeat / Duplicate"
          >
            <Repeat size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removePageFromWeek(weekId, page.instanceId);
            }}
            className="p-2 hover:bg-red-50 hover:text-red-600 rounded-none transition-colors text-stone-400"
            title="Remove"
          >
            <Trash2 size={16} />
          </button>
          <div
            className={clsx(
              "p-2 text-stone-400 transition-transform duration-200",
              isExpanded ? "rotate-90" : "",
            )}
          >
            <ChevronRight size={16} />
          </div>
        </div>
      </div>

      {/* Card Body (Forms) */}
      {isExpanded && (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-stone-50/30 border-t border-stone-100 animate-in slide-in-from-top-2 duration-200">
          {fields.map((field) => {
            const val = fieldValues[`${page.instanceId}:${field.id}`] || "";
            const inputId = `${page.instanceId}-${field.id}`;

            const isTextArea =
              field.rect.height > 60 ||
              field.name.toLowerCase().includes("log") ||
              field.name.toLowerCase().includes("desc") ||
              field.name.toLowerCase().includes("detail") ||
              field.name.toLowerCase().includes("lean"); // "Learn" typo handling

            return (
              <div key={field.id} className="space-y-1.5">
                {isTextArea ? (
                  <div className="w-full">
                    <label
                      htmlFor={inputId}
                      className="block text-xs font-bold text-stone-600 mb-2 uppercase tracking-widest"
                    >
                      {field.name}
                    </label>
                    <textarea
                      id={inputId}
                      rows={4}
                      value={val}
                      onChange={(e) =>
                        updateFieldValue(
                          page.instanceId,
                          field.id,
                          e.target.value,
                        )
                      }
                      className="flex w-full rounded-none border border-dashed border-stone-400 bg-white px-4 py-3 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-fillo-500 focus:border-transparent focus:border-solid transition-all resize-y min-h-[100px]"
                      placeholder={`Enter ${field.name}...`}
                    />
                  </div>
                ) : (
                  <Input
                    id={inputId}
                    label={field.name}
                    type={field.role === "date" ? "date" : "text"}
                    value={val}
                    onChange={(e) =>
                      updateFieldValue(
                        page.instanceId,
                        field.id,
                        e.target.value,
                      )
                    }
                  />
                )}
              </div>
            );
          })}
          {fields.length === 0 && (
            <div className="col-span-2 text-center text-stone-400 text-sm italic py-8 border-2 border-dashed border-stone-200 bg-stone-50">
              No fields configured for this page.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
