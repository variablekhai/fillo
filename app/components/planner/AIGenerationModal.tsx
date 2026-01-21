import React, { useState } from "react";
import { X, Sparkles, Loader2 } from "lucide-react";
import Button from "../ui/Button";

interface AIGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (details: string) => Promise<void>;
}

export const AIGenerationModal = ({
  isOpen,
  onClose,
  onGenerate,
}: AIGenerationModalProps) => {
  const [details, setDetails] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!details.trim()) return;

    setIsGenerating(true);
    try {
      await onGenerate(details);
      onClose();
      setDetails(""); // Reset after success
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2 text-stone-900 font-bold">
            <Sparkles className="text-fillo-600" size={20} />
            <span>Generate Logs with AI</span>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-stone-600">
            Describe what you did this week. The AI will use this context to
            fill in any empty fields in your logbook pages.
          </p>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Weekly Context
            </label>
            <textarea
              className="w-full h-32 p-3 bg-stone-50 border border-stone-200 rounded-lg focus:border-fillo-500 focus:ring-1 focus:ring-fillo-500 outline-none resize-none text-sm text-stone-800"
              placeholder="e.g. Worked on the login feature, attended daily standups, resolved bug #123 related to authentication..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              disabled={isGenerating}
            />
          </div>
        </div>

        <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} disabled={isGenerating}>
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={!details.trim() || isGenerating}
            leftIcon={
              isGenerating ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Sparkles size={16} />
              )
            }
          >
            {isGenerating ? "Generating..." : "Generate Logs"}
          </Button>
        </div>
      </div>
    </div>
  );
};
