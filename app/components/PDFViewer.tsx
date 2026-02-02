"use client";

import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useTemplateStore } from "../store/templateStore";

import { BoundingBox } from "../types";
import { X } from "lucide-react";

// Set worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const PDFViewer = () => {
  const {
    file,
    setNumPages,
    numPages,
    scale,
    setScale,
    currentPage,
    setCurrentPage,
  } = useTemplateStore();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const goToPrevPage = () => setCurrentPage(Math.max(currentPage - 1, 1));
  const goToNextPage = () =>
    setCurrentPage(Math.min(currentPage + 1, numPages));

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Toolbar */}
      <div className="h-16 flex items-center justify-between px-4 bg-white border-b border-gray-200 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage <= 1}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-sm font-medium transition-colors border border-gray-200"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-600">
            Page {currentPage} of {numPages || "--"}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage >= numPages}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-sm font-medium transition-colors border border-gray-200"
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-lg font-medium transition-colors border border-gray-200"
          >
            -
          </button>
          <span className="w-16 text-center font-mono text-sm">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(2.0, s + 0.1))}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-lg font-medium transition-colors border border-gray-200"
          >
            +
          </button>
        </div>
      </div>

      {/* Scrollable View Area */}
      <div className="flex-1 overflow-auto flex justify-center items-start p-8">
        {file && (
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            className="shadow-xl"
          >
            <div className="relative bg-white border border-gray-200">
              <Page
                pageNumber={currentPage}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
              {/* Overlay for drawing fields */}
              <div className="absolute inset-0">
                <ConnectedFieldOverlay
                  pageIndex={currentPage - 1}
                  scale={scale}
                />
              </div>
            </div>
          </Document>
        )}
      </div>
    </div>
  );
};

// Internal component for the overlay to access store and handle drawing
const ConnectedFieldOverlay = ({
  pageIndex,
  scale,
}: {
  pageIndex: number;
  scale: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addField, fields, removeField } = useTemplateStore();
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentRect, setCurrentRect] = useState<BoundingBox | null>(null);

  const pageFields = fields.filter((f) => f.pageIndex === pageIndex);

  const getMousePos = (e: React.MouseEvent) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    // Return coordinates in "PDF Points" (unscaled)
    // We divide by scale to map back to original PDF coordinate system
    return {
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale,
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDrawing(true);
    const pos = getMousePos(e);
    setStartPos(pos);
    setCurrentRect({ x: pos.x, y: pos.y, width: 0, height: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const pos = getMousePos(e);
    setCurrentRect({
      x: Math.min(startPos.x, pos.x),
      y: Math.min(startPos.y, pos.y),
      width: Math.abs(pos.x - startPos.x),
      height: Math.abs(pos.y - startPos.y),
    });
  };

  const handleMouseUp = () => {
    if (!isDrawing || !currentRect) return;
    setIsDrawing(false);
    if (currentRect.width > 5 && currentRect.height > 5) {
      addField({
        name: "Field",
        pageIndex,
        rect: currentRect,
        role: "text",
      });
    }
    setCurrentRect(null);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {pageFields.map((field) => (
        <div
          key={field.id}
          className="absolute border border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 group"
          style={{
            left: field.rect.x * scale,
            top: field.rect.y * scale,
            width: field.rect.width * scale,
            height: field.rect.height * scale,
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <span className="absolute -top-5 left-0 bg-blue-500 text-white text-[10px] px-1 hover:z-50 z-10 pointer-events-none whitespace-nowrap">
            {field.name}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeField(field.id);
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-none w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={10} />
          </button>
        </div>
      ))}

      {currentRect && (
        <div
          className="absolute border border-dashed border-blue-500 bg-blue-500/10 pointer-events-none"
          style={{
            left: currentRect.x * scale,
            top: currentRect.y * scale,
            width: currentRect.width * scale,
            height: currentRect.height * scale,
          }}
        />
      )}
    </div>
  );
};
