"use client";

import { Page } from "react-pdf";

export const PDFPageThumbnail = ({
  pageIndex,
  width = 100,
}: {
  pageIndex: number;
  width?: number;
}) => {
  return (
    <div
      className="relative bg-white overflow-hidden pointer-events-none select-none"
      style={{ width, height: width * 1.414 }}
    >
      <Page
        pageNumber={pageIndex + 1}
        width={width * 2}
        scale={0.5}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        loading={<div className="w-full h-full bg-stone-100 animate-pulse" />}
        error={
          <div className="w-full h-full flex items-center justify-center bg-red-50 text-[10px] text-red-500">
            Error
          </div>
        }
      />
    </div>
  );
};
