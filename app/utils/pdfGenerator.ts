import { PDFDocument, rgb, StandardFonts, PDFFont } from "pdf-lib";
import { AppState } from "../types";

export const generatePDF = async (state: AppState) => {
  if (!state.file) return;

  const arrayBuffer = await state.file.arrayBuffer();
  const templatePdf = await PDFDocument.load(arrayBuffer);
  const pdfDoc = await PDFDocument.create();

  // Embed the standard font for measurement and drawing
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Iterate Week by Week, then Page by Page
  for (const week of state.weeks) {
    for (const pageConfig of week.pages) {
      const [templatePage] = await pdfDoc.copyPages(templatePdf, [
        pageConfig.templatePageIndex,
      ]);

      // Get fields for this template page
      const fields = state.fieldDefinitions.filter(
        (f) => f.pageIndex === pageConfig.templatePageIndex,
      );

      const { height: pageHeight } = templatePage.getSize();

      // Draw fields
      for (const field of fields) {
        const value =
          state.fieldValues[`${pageConfig.instanceId}:${field.id}`] || "";
        if (value) {
          // Calculate best fitting font size
          const fontSize = calculateFontSize(
            value,
            field.rect.width,
            field.rect.height,
            font,
          );

          const lineHeight = fontSize * 1.2;

          templatePage.drawText(value, {
            x: field.rect.x + 2,
            // Align to Top: pageHeight - field.y is PDF Y for top edge.
            // Move down by a bit of padding and approximate ascender height (using fontSize as proxy)
            y: pageHeight - field.rect.y - 2 - fontSize,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
            maxWidth: field.rect.width,
            lineHeight: lineHeight,
          });
        }
      }

      pdfDoc.addPage(templatePage);
    }
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

// Helper to determine optimal font size
function calculateFontSize(
  text: string,
  maxWidth: number,
  maxHeight: number,
  font: PDFFont,
): number {
  let size = 12; // Start with default size
  const minSize = 6;

  if (!text) return size;

  while (size >= minSize) {
    const lineHeight = size * 1.2;
    const lines = breakTextIntoLines(text, size, maxWidth, font);
    const totalHeight = lines.length * lineHeight;

    // Check if any single line (or word) exceeds maxWidth
    // breakTextIntoLines creates lines that fit maxWidth, unless a single word is too long
    const isTooWide = lines.some(
      (line) => font.widthOfTextAtSize(line, size) > maxWidth,
    );

    if (totalHeight <= maxHeight && !isTooWide) {
      return size;
    }
    size -= 0.5;
  }
  return minSize;
}

// simulate text wrapping to count lines
function breakTextIntoLines(
  text: string,
  size: number,
  maxWidth: number,
  font: PDFFont,
): string[] {
  const lines: string[] = [];
  const paragraphs = text.split(/\r?\n/);

  for (const paragraph of paragraphs) {
    const words = paragraph.split(" ");
    if (words.length === 0) continue;

    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine + " " + word;
      const width = font.widthOfTextAtSize(testLine, size);

      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
  }
  return lines;
}
