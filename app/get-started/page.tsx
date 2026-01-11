"use client";

import Image from "next/image";

import React, { useState } from "react";
import Footer from "@/app/components/Footer";
import { Stepper } from "@/app/components/ui/Stepper";
import Button from "@/app/components/ui/Button";
import {
  Upload,
  GraduationCap,
  ArrowRight,
  FileText,
  PlusIcon,
} from "lucide-react";

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Select Template", "Capture Fields", "Fill Data"];

  // Mock template selection handler
  const handleSelectUniversityTemplate = () => {
    console.log("UMPSA Template Selected");
    // setCurrentStep(1); // Proceed to next step in real implementation
  };

  // Mock file upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File uploaded:", file.name);
      // Logic to handle file and move to next step would go here
    }
  };

  return (
    <div className="min-h-screen bg-fillo-50 flex flex-col font-sans">
      <Stepper steps={steps} currentStep={currentStep} />

      <main className="grow flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl space-y-12">
          {/* Heading */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
              Select Your Template
            </h1>
            <p className="text-stone-600 max-w-lg mx-auto">
              Choose a starting point. Use the official UMPSA internship logbook
              template or upload your own custom PDF to begin.
            </p>
          </div>

          {/* Selection Cards Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto w-full px-4">
            {/* Option 1: UMPSA Template */}
            <div className="group relative w-full max-w-sm mx-auto aspect-[1/1.414] bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out border-2 border-dashed border-stone-300 hover:border-fillo-400 p-2 cursor-default">
              {/* Cover Image */}
              <div className="relative w-full h-full bg-stone-100 overflow-hidden">
                <Image
                  src="/images/umpsa-cover.jpg"
                  alt="UMPSA Logbook Cover"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-2 bg-fillo-50/85 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm border border-stone-200">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-6">
                  <div className="w-12 h-12 bg-fillo-100 rounded-full flex items-center justify-center mx-auto text-fillo-700">
                    <GraduationCap size={24} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-stone-900">
                      UMPSA Template
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      The official internship logbook template for UMPSA
                      students. Pre-configured with standard layouts and fields.
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    className="w-full"
                    rightIcon={<ArrowRight size={16} />}
                    onClick={handleSelectUniversityTemplate}
                  >
                    Use Template
                  </Button>
                </div>
              </div>
            </div>

            {/* Option 2: Upload Custom Template */}
            <div className="group relative w-full max-w-sm mx-auto aspect-[1/1.414] bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out border-2 border-dashed border-stone-300 hover:border-fillo-400 p-2">
              {/* Cover */}
              <div className="relative w-full h-full bg-stone-50 flex flex-col items-center justify-center border border-stone-100">
                <PlusIcon size={32} className="text-stone-400 mb-2" />
                <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                  Custom PDF
                </h3>
                <p className="text-xs text-stone-400 mt-1 font-medium uppercase tracking-widest">
                  Upload Your Own
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-2 bg-fillo-50/85 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm border border-stone-200">
                <input
                  type="file"
                  accept=".pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  onChange={handleFileUpload}
                />

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-6 relative z-10 pointer-events-none">
                  <div className="w-12 h-12 bg-fillo-100 rounded-full flex items-center justify-center mx-auto text-fillo-700">
                    <Upload size={24} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-stone-900">
                      Custom PDF
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      For students from other universities or for custom needs.
                      Upload any PDF to use as your logbook template.
                    </p>
                  </div>

                  {/* Select PDF Button */}
                  <div className="w-full h-11 px-6 bg-fillo-600 text-white shadow-sm flex items-center justify-center font-bold tracking-tight uppercase text-xs md:text-sm transition-colors group-hover:bg-fillo-700">
                    <span className="flex items-center gap-2">
                      Select PDF
                      <Upload size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
