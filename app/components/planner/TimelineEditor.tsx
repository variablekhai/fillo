"use client";

import React, { useEffect, useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import { Document, pdfjs } from "react-pdf";
import { WeekSidebar } from "./WeekSidebar";
import { WeekView } from "./WeekView";
import { TemplateDrawer } from "./TemplateDrawer";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { generatePDF } from "../../utils/pdfGenerator";

// Ensure worker is set
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const TimelineEditor = () => {
  const appState = useAppStore();
  const {
    weeks,
    activeWeekId,
    setActiveWeek,
    addWeek,
    duplicateWeek,
    removeWeek,
    file,
    fieldDefinitions,
    fieldValues,
    updateFieldValue,
    addPageToWeek,
    removePageFromWeek,
    updateWeek,
    numPages,
    setNumPages,
  } = appState;

  const [isTemplateDrawerOpen, setIsTemplateDrawerOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      // Wait a bit to allow UI to update
      await new Promise((resolve) => setTimeout(resolve, 100));

      const pdfBytes = await generatePDF(appState);
      if (!pdfBytes) throw new Error("Failed to generate PDF");

      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `planner-${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  // Auto-select first week
  useEffect(() => {
    if (!activeWeekId && weeks.length > 0) {
      setActiveWeek(weeks[0].id);
    }
  }, [weeks, activeWeekId, setActiveWeek]);

  const activeWeek = weeks.find((w) => w.id === activeWeekId);
  const activeWeekIndex = weeks.findIndex((w) => w.id === activeWeekId);

  if (!file) {
    return (
      <div className="flex h-full items-center justify-center text-stone-400 gap-2">
        <Loader2 className="animate-spin" size={20} />
        <p>Loading Template...</p>
      </div>
    );
  }

  return (
    <Document
      file={file}
      onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
      className="flex h-full bg-stone-50 overflow-hidden font-sans"
    >
      {/* 1. Left Sidebar */}
      <WeekSidebar
        weeks={weeks}
        activeWeekId={activeWeekId}
        setActiveWeek={setActiveWeek}
        addWeek={addWeek}
        duplicateWeek={duplicateWeek}
        removeWeek={removeWeek}
        onExport={handleExport}
        isExporting={isExporting}
      />

      {/* 2. Main Content */}
      <main className="flex-1 flex flex-col relative min-w-0 bg-stone-50">
        {activeWeek ? (
          <WeekView
            week={activeWeek}
            weekIndex={activeWeekIndex}
            numPages={numPages}
            fieldDefinitions={fieldDefinitions}
            fieldValues={fieldValues}
            updateFieldValue={updateFieldValue}
            addPageToWeek={addPageToWeek}
            removePageFromWeek={removePageFromWeek}
            updateWeek={updateWeek}
            onOpenTemplateDrawer={() => setIsTemplateDrawerOpen(true)}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-stone-300">
            <CalendarIcon size={64} strokeWidth={1} />
            <p className="mt-4 font-medium text-stone-400">
              Select or create a week to start planning.
            </p>
          </div>
        )}
      </main>

      {/* 3. Template Drawer */}
      <TemplateDrawer
        isOpen={isTemplateDrawerOpen}
        onClose={() => setIsTemplateDrawerOpen(false)}
        numPages={numPages}
        onAddPage={(pageIndex) => {
          if (activeWeekId) {
            addPageToWeek(activeWeekId, pageIndex);
            setIsTemplateDrawerOpen(false);
          }
        }}
        fieldDefinitions={fieldDefinitions}
      />
    </Document>
  );
};
