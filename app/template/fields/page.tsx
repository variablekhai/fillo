"use client";

import { useEffect, useState } from "react";
import { Stepper } from "@/app/components/ui/Stepper";
import { PDFWorkbench } from "@/app/components/PDFWorkbench";
import { useTemplateStore } from "@/app/store/templateStore";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import Footer from "@/app/components/Footer";
import { UMPSA_PRESET_FIELDS } from "@/app/config/template-presets";

export default function TemplateViewerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateType = searchParams.get("template");
  const { setFile, file, setFields, setCurrentPage } = useTemplateStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTemplate() {
      if (templateType === "umpsa") {
        try {
          const response = await fetch("/template/umpsa-template.pdf");
          if (!response.ok) throw new Error("Failed to load template");

          const blob = await response.blob();
          const file = new File([blob], "umpsa-template.pdf", {
            type: "application/pdf",
          });
          setFile(file);
          setFields(UMPSA_PRESET_FIELDS);
          setCurrentPage(3);
        } catch (error) {
          console.error("Error loading template:", error);
          // Handle error (probably toast here lol)
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    // Only load if we don't already have a file (or if we want to force reload for "umpsa")
    // For this flow, let's load if "umpsa" is param.
    if (!file || templateType === "umpsa") {
      loadTemplate();
    } else {
      setLoading(false);
    }
  }, [templateType, setFile, setFields, setCurrentPage]);

  // Stepper steps
  const steps = ["Select Template", "Capture Fields", "Fill Data"];

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">
      {/* 
        Stepper Header 
      */}
      <Stepper steps={steps} currentStep={1} />

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center text-stone-500">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="animate-spin" size={32} />
              <p>Loading Template...</p>
            </div>
          </div>
        ) : (
          <PDFWorkbench />
        )}
      </main>
      <Footer />
    </div>
  );
}
