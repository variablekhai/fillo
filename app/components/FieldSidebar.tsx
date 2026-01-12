import { useTemplateStore } from "../store/templateStore";
import { FieldItem } from "./FieldItem";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";
import { ArrowRight, ScanEye } from "lucide-react";
import clsx from "clsx";

export const FieldSidebar = () => {
  const router = useRouter();
  const { fields, updateField, removeField, setCurrentPage, currentPage } =
    useTemplateStore();

  // Group by page
  const fieldsByPage = fields.reduce((acc, field) => {
    if (!acc[field.pageIndex]) acc[field.pageIndex] = [];
    acc[field.pageIndex].push(field);
    return acc;
  }, {} as Record<number, typeof fields>);

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full flex flex-col z-20">
      <div className="h-16 px-4 flex flex-col justify-center border-b border-gray-200 bg-gray-50 shrink-0">
        <h2 className="font-semibold text-gray-800 leading-tight">Fields</h2>
        <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">
          Configure Inputs
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {Object.keys(fieldsByPage).length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-4 opacity-50 space-y-2">
            <div className="border-2 border-dashed border-gray-300 p-4">
              <div className="w-8 h-8 mx-auto bg-gray-200" />
            </div>
            <p className="text-sm text-gray-500 font-medium">
              Draw a box on the PDF to create a field.
            </p>
          </div>
        )}

        {Object.entries(fieldsByPage).map(([pageIndex, fields]) => {
          const pageNum = Number(pageIndex) + 1;
          const isActive = currentPage === pageNum;

          return (
            <div key={pageIndex}>
              <button
                onClick={() => setCurrentPage(pageNum)}
                title={`Jump to Page ${pageNum}`}
                className={clsx(
                  "w-full text-xs font-bold uppercase mb-3 tracking-wider flex items-center justify-between p-2 border transition-all rounded-sm text-left group cursor-pointer",
                  isActive
                    ? "bg-fillo-600 text-white border-fillo-600 shadow-md ring-1 ring-fillo-600"
                    : "bg-fillo-50 text-fillo-600 border-fillo-100/50 hover:bg-fillo-100 hover:border-fillo-200 hover:text-fillo-700"
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={clsx(
                      "w-2 h-2 shadow-sm transition-colors",
                      isActive ? "bg-white" : "bg-fillo-500"
                    )}
                  />
                  Page {pageNum}
                </div>
                <ScanEye
                  size={14}
                  className={clsx(
                    "transition-all duration-200",
                    isActive
                      ? "opacity-100"
                      : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-fillo-400"
                  )}
                />
              </button>
              <div className="space-y-3">
                {fields.map((field) => (
                  <FieldItem
                    key={field.id}
                    field={field}
                    onUpdate={updateField}
                    onRemove={removeField}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {/* Actions Section */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <Button
          className="w-full"
          disabled={fields.length === 0}
          onClick={() => router.push("/template/fill")}
          rightIcon={<ArrowRight size={16} />}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
