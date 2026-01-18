import { PDFDocument, rgb } from "pdf-lib";
import { AppState } from "../types";

export const generatePDF = async (state: AppState) => {
  if (!state.file) return;

  const arrayBuffer = await state.file.arrayBuffer();
  const templatePdf = await PDFDocument.load(arrayBuffer);
  const pdfDoc = await PDFDocument.create();

  // Iterate Week by Week, then Page by Page
  for (const week of state.weeks) {
    for (const pageConfig of week.pages) {
      const [templatePage] = await pdfDoc.copyPages(templatePdf, [
        pageConfig.templatePageIndex,
      ]);

      // Get fields for this template page
      const fields = state.fieldDefinitions.filter(
        (f) => f.pageIndex === pageConfig.templatePageIndex
      );

      const { height: pageHeight } = templatePage.getSize();

      // Draw fields
      for (const field of fields) {
        const value =
          state.fieldValues[`${pageConfig.instanceId}:${field.id}`] || "";
        if (value) {
          templatePage.drawText(value, {
            x: field.rect.x + 2,
            // Inverting Y for pdf-lib (bottom-left origin) vs DOM (top-left)
            y: pageHeight - field.rect.y - 12 - field.rect.height / 2 + 6,
            size: 12,
            color: rgb(0, 0, 0),
            maxWidth: field.rect.width,
          });
        }
      }

      pdfDoc.addPage(templatePage);
    }
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
