import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as fs from 'fs';
import express, { Request, Response, Router, RequestHandler, NextFunction } from 'express';

const generatePDF = async (markdownText: string) => {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const fontSize = 15;
  const margin = 50;
  const lineHeight = fontSize + 10;

  const lines = markdownText.split('\n')

  let page = pdfDoc.addPage([595, 842]);
  const { height } = page.getSize();
  let y = height - margin;

  lines.forEach((line : string) => {
    const new_lines = splitTextIntoLines(line, timesRomanFont, fontSize, 75);
    if(new_lines.length > 1){
      new_lines.forEach((new_line: string) => {
        if (y - lineHeight < margin) {
          page = pdfDoc.addPage([595, 842]);
          y = height - margin;
        }
        page.drawText(new_line, {
          x: margin,
          y: y,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        y -= lineHeight;
      });
    } else {
        if (y - lineHeight < margin) {
          page = pdfDoc.addPage([595, 842]);
          y = height - margin;
        }
      page.drawText(line, {
        x: margin,
        y: y,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight;
    }

    });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

const splitTextIntoLines = (
  text: string,
  font: any,
  fontSize: number,
  maxWidth: number
) => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word : string) => {
    const testLine = currentLine ? currentLine + ' ' + word : word;

    if (testLine.length <= maxWidth) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) {
    lines.push(currentLine); // Push the last line
  }

  return lines;
};



const pdfRouter: Router = express.Router();

const exportPdfHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { inputText } = req.body;
    if(!inputText){
      res.status(400).json({message: "Content is required"})
      return
    }
    const pdfBytes = await generatePDF(inputText);
    res.status(200).set({
      'Content-Type': 'application/pdf',
    }).send(Buffer.from(pdfBytes));
};

pdfRouter.post("/export-pdf", exportPdfHandler)

export default pdfRouter;
