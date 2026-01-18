"use client";
import { useEffect, useState } from "react";
import { TimelineEditor } from "@/app/components/planner/TimelineEditor";
import { Stepper } from "@/app/components/ui/Stepper";
import Footer from "@/app/components/Footer";
import { useAppStore } from "@/app/store/useAppStore";
import { useSearchParams } from "next/navigation";
import { UMPSA_PRESET_FIELDS } from "@/app/config/template-presets";
import { Loader2 } from "lucide-react";

export default function PlannerPage() {
  const steps = ["Select Template", "Capture Fields", "Fill Data"];
  const searchParams = useSearchParams();
  // Assume default to umpsa if visiting directly for now, or respect query logic
  const templateType = searchParams.get("template") || "umpsa";

  const {
    file: storeFile,
    setFile: setStoreFile,
    fieldDefinitions,
    addFieldDefinition,
    setNumPages,
  } = useAppStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTemplate() {
      // If we already have a file, just stop loading
      if (storeFile) {
        setLoading(false);
        return;
      }

      if (templateType === "umpsa") {
        try {
          const response = await fetch("/template/umpsa-template.pdf");
          if (!response.ok) throw new Error("Failed to load template");

          const blob = await response.blob();
          const file = new File([blob], "umpsa-template.pdf", {
            type: "application/pdf",
          });

          setStoreFile(file);

          if (fieldDefinitions.length === 0) {
            UMPSA_PRESET_FIELDS.forEach((f) => addFieldDefinition(f));
          }
        } catch (error) {
          console.error("Error loading template:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    loadTemplate();
  }, [
    storeFile,
    templateType,
    setStoreFile,
    fieldDefinitions.length,
    addFieldDefinition,
  ]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2 text-stone-500">
          <Loader2 className="animate-spin" size={32} />
          <p>Loading Planner...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">
      <Stepper steps={steps} currentStep={2} />
      <div className="flex-1 overflow-hidden">
        <TimelineEditor />
      </div>
      <Footer />
    </div>
  );
}
