import dynamic from "next/dynamic";
import { FieldSidebar } from "./FieldSidebar";

const PDFViewer = dynamic(
  () => import("./PDFViewer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full text-gray-400">
        Loading PDF Viewer...
      </div>
    ),
  }
);

export const PDFWorkbench = () => {
  return (
    <div className="flex h-full">
      <div className="flex-1 relative bg-gray-200 h-full overflow-hidden">
        <PDFViewer />
      </div>
      <FieldSidebar />
    </div>
  );
};
