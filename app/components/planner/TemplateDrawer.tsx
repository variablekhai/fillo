"use client";

import { X, Plus } from "lucide-react";
import clsx from "clsx";
import { PDFPageThumbnail } from "./PDFPageThumbnail";
import { FieldDefinition } from "../../types";
import { FileText } from "lucide-react";

interface TemplateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  numPages: number;
  onAddPage: (i: number) => void;
  fieldDefinitions: FieldDefinition[];
}

export const TemplateDrawer = ({
  isOpen,
  onClose,
  numPages,
  onAddPage,
  fieldDefinitions,
}: TemplateDrawerProps) => {
  // Configured pages map to show indicator
  const configuredPages = new Set(fieldDefinitions.map((f) => f.pageIndex));

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={clsx(
          "fixed top-0 bottom-0 right-0 w-80 bg-white border-l border-stone-200 shadow-2xl z-40 transform transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-white shrink-0">
          <h3 className="font-bold text-lg text-stone-900 font-serif tracking-tight">
            Add Page
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-none text-stone-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
          <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">
            Available Templates ({numPages})
          </p>

          <div className="grid grid-cols-1 gap-4 pb-20">
            {Array.from({ length: numPages }).map((_, i) => {
              const hasConfig = configuredPages.has(i);
              return (
                <button
                  key={i}
                  onClick={() => onAddPage(i)}
                  className="group flex flex-col items-center gap-2 text-left"
                >
                  <div
                    className={clsx(
                      "relative w-full aspect-[1/1.414] bg-white shadow-sm border border-stone-200 group-hover:border-fillo-500 group-hover:shadow-md transition-all overflow-hidden",
                      hasConfig
                        ? "ring-2 ring-transparent group-hover:ring-fillo-200"
                        : "opacity-80",
                    )}
                  >
                    <div className="absolute inset-0 pointer-events-none">
                      <PDFPageThumbnail pageIndex={i} width={280} />
                    </div>

                    {/* Config Indicator */}
                    {hasConfig && (
                      <div
                        className="absolute top-2 right-2 bg-white/90 backdrop-blur text-fillo-700 p-1.5 shadow-sm border border-fillo-100"
                        title="Has configured fields"
                      >
                        <FileText size={14} />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-fillo-900/0 group-hover:bg-fillo-900/10 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 bg-fillo-600 text-white px-4 py-2 shadow-lg font-bold text-sm transform translate-y-2 group-hover:translate-y-0 transition-all flex items-center gap-2">
                        <Plus size={16} /> Add
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-center group-hover:text-fillo-700 transition-colors">
                    <span className="text-xs font-bold text-stone-500">
                      Template Page {i + 1}
                    </span>
                    {hasConfig ? (
                      <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 border border-green-200 uppercase font-bold tracking-wide">
                        Ready
                      </span>
                    ) : (
                      <span className="text-[10px] text-stone-400">
                        No Fields
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
