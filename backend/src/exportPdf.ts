import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import * as fs from 'fs';


export const generatePDF = async (markdownText: string, outputPath: string) => {
  const pdfDoc = await PDFDocument.create()
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const fontSize = 30
  page.drawText(markdownText, {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  })

  const pdfBytes = await pdfDoc.save()
  fs.writeFileSync(outputPath, pdfBytes);
}
