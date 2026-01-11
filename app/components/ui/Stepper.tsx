import React from "react";
import clsx from "clsx";
import { Check } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number; // 0-indexed
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <header className="sticky top-0 z-50 bg-fillo-50/90 backdrop-blur-md border-b border-dashed border-stone-300 h-16 flex items-center justify-center px-4">
      {/* Desktop Steps */}
      <div className="hidden md:flex items-center space-x-1">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={index} className="flex items-center">
              {/* Step Item */}
              <div className="flex items-center gap-2">
                {/* Circle Indicator */}
                <div
                  className={clsx(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono border transition-all duration-300",
                    isCompleted
                      ? "bg-fillo-600 border-fillo-600 text-white"
                      : isCurrent
                      ? "bg-white border-fillo-600 text-fillo-600 ring-2 ring-fillo-100"
                      : "bg-white border-stone-300 text-stone-400"
                  )}
                >
                  {isCompleted ? (
                    <Check size={12} strokeWidth={3} />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Label */}
                <span
                  className={clsx(
                    "text-sm font-bold uppercase tracking-wider transition-colors duration-300",
                    isCurrent ? "text-stone-900" : "text-stone-400"
                  )}
                >
                  {step}
                </span>
              </div>

              {/* Connector Line (if not last) */}
              {!isLast && (
                <div
                  className={clsx(
                    "w-8 h-px mx-4 transition-colors duration-300",
                    index < currentStep ? "bg-fillo-600" : "bg-stone-300"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Step Indicator */}
      <div className="md:hidden flex items-center gap-2">
        <span className="text-sm font-bold text-fillo-600">
          Step {currentStep + 1}
        </span>
        <span className="text-sm text-stone-400">of {steps.length}</span>
        <span className="text-sm font-medium text-stone-900 ml-2">
          {steps[currentStep]}
        </span>
      </div>
    </header>
  );
};
