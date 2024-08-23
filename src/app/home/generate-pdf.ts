import jsPDF from 'jspdf';
import { Questionaire } from './home.component';
import { FormGroup } from '@angular/forms';

export function generateImagePDF(form: FormGroup<Questionaire>): void {
  function wrapText(
    context: any,
    text: any,
    x: any,
    y: any,
    maxWidth: any,
    lineHeight: any
  ): number {
    var words = text.split(' ');
    var line = '';
    var lines = 1;

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
        lines++;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);

    return lines; // This will give you the count of lines that were wrapped and drawn
  }
  const SCALING_FACTOR = 3;

  var canvas = document.createElement('canvas');
  canvas.width = 595 * SCALING_FACTOR;
  canvas.height = 842 * SCALING_FACTOR;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  const pageWidth = canvas.width;
  const pageCenter = pageWidth / 2;
  const title = form.value.title || 'NO TITLE';
  const lineHeight = 20 * SCALING_FACTOR; // Set your line height
  const maxWidth = 1550; // THIS NUMBER IS JUST RANDOM BY TESTING...

  ctx.textBaseline = 'bottom';

  // Draw title
  ctx.font = `${20 * SCALING_FACTOR}px Times New Roman`;
  ctx.textAlign = 'center';
  const lineNum = wrapText(
    ctx,
    title,
    pageCenter,
    40 * SCALING_FACTOR,
    maxWidth,
    lineHeight
  );
  let yPos = lineHeight * lineNum + 50 * SCALING_FACTOR;
  ctx.textAlign = 'left';

  const questions = form.value.questions;

  let answersText = 'Atsakymai:   ';

  ctx.font = `${15 * SCALING_FACTOR}px Times New Roman`;

  questions?.forEach((q: any, index: any) => {
    if (!ctx) return;

    const lineNum = wrapText(
      ctx,
      `${index + 1}. ${q.text}`,
      40 * SCALING_FACTOR,
      yPos,
      maxWidth,
      lineHeight
    );
    yPos += lineHeight * lineNum;
    yPos += 5 * SCALING_FACTOR;

    let optionsText = q.options
      .map(
        (option: any, optionIndex: any) =>
          `${String.fromCharCode(65 + optionIndex)}) ${option}`
      )
      .join('   ');

    let lineWidth = ctx.measureText(optionsText).width;
    if (lineWidth > pageWidth / 2 - 20 * SCALING_FACTOR) {
      // If options exceed half the page width, start a new line for each
      q.options.forEach((option: any, optionIndex: any) => {
        let optionLabel = `${String.fromCharCode(65 + optionIndex)}) ${option}`;
        if (!ctx) return;
        const lineNum = wrapText(
          ctx,
          optionLabel,
          60 * SCALING_FACTOR,
          yPos,
          maxWidth - 20 * SCALING_FACTOR,
          lineHeight
        );
        yPos += lineHeight * lineNum;
        yPos += 5 * SCALING_FACTOR; // Increment y position for each option
      });
    } else {
      // Options fit in one line
      ctx.fillText(optionsText, 60 * SCALING_FACTOR, yPos);
      yPos += 20 * SCALING_FACTOR;
    }

    yPos += 10 * SCALING_FACTOR; // Additional space after each question

    //ans
    answersText += `${index + 1}. ${
      q.selectedOption === 0
        ? 'A'
        : q.selectedOption === 1
        ? 'B'
        : q.selectedOption === 2
        ? 'C'
        : q.selectedOption === 3
        ? 'D'
        : '???'
    }   `;
  });

  ctx.font = `${8 * SCALING_FACTOR}px Times New Roman`;
  ctx.fillText(
    answersText,
    40 * SCALING_FACTOR,
    canvas.height - 20 * SCALING_FACTOR
  );

  ctx.textAlign = 'right';
  const footer = 'Šį failą sugeneravo Skafis. www.skafis.lt';
  ctx.fillText(
    footer,
    canvas.width - 40 * SCALING_FACTOR,
    canvas.height - 20 * SCALING_FACTOR
  );

  var imgData = canvas.toDataURL('image/png');
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  // Calculate the scale to fit the A5 content in A4 page width
  const scale =
    doc.internal.pageSize.getWidth() / 2 / (canvas.width / SCALING_FACTOR);
  const a5Height = (canvas.height / SCALING_FACTOR) * scale;

  // Add the canvas image twice, once on each side of the A4 landscape page
  doc.addImage(
    imgData,
    'PNG',
    0,
    0,
    doc.internal.pageSize.getWidth() / 2,
    a5Height
  );
  doc.addImage(
    imgData,
    'PNG',
    doc.internal.pageSize.getWidth() / 2,
    0,
    doc.internal.pageSize.getWidth() / 2,
    a5Height
  );

  // Draw a vertical line down the middle of the page to separate both sides
  doc.setDrawColor(0);
  doc.setLineWidth(0.1);
  doc.line(
    doc.internal.pageSize.getWidth() / 2,
    0,
    doc.internal.pageSize.getWidth() / 2,
    doc.internal.pageSize.getHeight()
  );
  doc.save(`${form.value.title}.pdf`);
}

export function generateImagePDFNoAns(form: FormGroup<Questionaire>): void {
  function wrapText(
    context: any,
    text: any,
    x: any,
    y: any,
    maxWidth: any,
    lineHeight: any
  ): number {
    var words = text.split(' ');
    var line = '';
    var lines = 1;

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
        lines++;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);

    return lines; // This will give you the count of lines that were wrapped and drawn
  }
  const SCALING_FACTOR = 3;

  var canvas = document.createElement('canvas');
  canvas.width = 595 * SCALING_FACTOR;
  canvas.height = 842 * SCALING_FACTOR;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  const pageWidth = canvas.width;
  const pageCenter = pageWidth / 2;
  const title = form.value.title || 'NO TITLE';
  const lineHeight = 20 * SCALING_FACTOR; // Set your line height
  const maxWidth = 1550; // THIS NUMBER IS JUST RANDOM BY TESTING...

  ctx.textBaseline = 'bottom';

  // Draw title
  ctx.font = `${20 * SCALING_FACTOR}px Times New Roman`;
  ctx.textAlign = 'center';
  const lineNum = wrapText(
    ctx,
    title,
    pageCenter,
    40 * SCALING_FACTOR,
    maxWidth,
    lineHeight
  );
  let yPos = lineHeight * lineNum + 50 * SCALING_FACTOR;
  ctx.textAlign = 'left';

  const questions = form.value.questions;

  ctx.font = `${15 * SCALING_FACTOR}px Times New Roman`;

  questions?.forEach((q: any, index: any) => {
    if (!ctx) return;

    const lineNum = wrapText(
      ctx,
      `${index + 1}. ${q.text}`,
      40 * SCALING_FACTOR,
      yPos,
      maxWidth,
      lineHeight
    );
    yPos += lineHeight * lineNum;
    yPos += 5 * SCALING_FACTOR;

    let optionsText = q.options
      .map(
        (option: any, optionIndex: any) =>
          `${String.fromCharCode(65 + optionIndex)}) ${option}`
      )
      .join('   ');

    let lineWidth = ctx.measureText(optionsText).width;
    if (lineWidth > pageWidth / 2 - 20 * SCALING_FACTOR) {
      // If options exceed half the page width, start a new line for each
      q.options.forEach((option: any, optionIndex: any) => {
        let optionLabel = `${String.fromCharCode(65 + optionIndex)}) ${option}`;
        if (!ctx) return;
        const lineNum = wrapText(
          ctx,
          optionLabel,
          60 * SCALING_FACTOR,
          yPos,
          maxWidth - 20 * SCALING_FACTOR,
          lineHeight
        );
        yPos += lineHeight * lineNum;
        yPos += 5 * SCALING_FACTOR; // Increment y position for each option
      });
    } else {
      // Options fit in one line
      ctx.fillText(optionsText, 60 * SCALING_FACTOR, yPos);
      yPos += 20 * SCALING_FACTOR;
    }

    yPos += 10 * SCALING_FACTOR; // Additional space after each question
  });

  ctx.font = `${8 * SCALING_FACTOR}px Times New Roman`;

  ctx.textAlign = 'right';
  const footer = 'Šį failą sugeneravo Skafis. www.skafis.lt';
  ctx.fillText(
    footer,
    canvas.width - 40 * SCALING_FACTOR,
    canvas.height - 20 * SCALING_FACTOR
  );

  var imgData = canvas.toDataURL('image/png');
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  // Calculate the scale to fit the A5 content in A4 page width
  const scale =
    doc.internal.pageSize.getWidth() / 2 / (canvas.width / SCALING_FACTOR);
  const a5Height = (canvas.height / SCALING_FACTOR) * scale;

  // Add the canvas image twice, once on each side of the A4 landscape page
  doc.addImage(
    imgData,
    'PNG',
    0,
    0,
    doc.internal.pageSize.getWidth() / 2,
    a5Height
  );
  doc.addImage(
    imgData,
    'PNG',
    doc.internal.pageSize.getWidth() / 2,
    0,
    doc.internal.pageSize.getWidth() / 2,
    a5Height
  );

  // Draw a vertical line down the middle of the page to separate both sides
  doc.setDrawColor(0);
  doc.setLineWidth(0.1);
  doc.line(
    doc.internal.pageSize.getWidth() / 2,
    0,
    doc.internal.pageSize.getWidth() / 2,
    doc.internal.pageSize.getHeight()
  );
  doc.save(`${form.value.title}.pdf`);
}

export function generateTextPDF(form: FormGroup<Questionaire>): void {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageCenter = pageWidth / 2;
  const title = form.value.title || 'NO TITLE';

  pdf.setFont('times', 'normal');

  //TITLE
  pdf.setFontSize(14);
  pdf.text(title, pageWidth / 4, 10, {
    align: 'center',
    maxWidth: pageWidth / 2 - 20,
  }); // Center title in the first half
  pdf.text(title, (pageWidth / 4) * 3, 10, {
    align: 'center',
    maxWidth: pageWidth / 2 - 20,
  }); // Center title in the second half

  const questions = form.value.questions;
  const drawQuestions = (
    doc: any,
    questions: any,
    startX: any,
    startY: any
  ) => {
    let yPos = startY;
    let answersText = 'Atsakymai:   ';

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    questions.forEach((q: any, index: any) => {
      doc.text(`${index + 1}. ${q.text}`, startX, yPos, {
        maxWidth: pageWidth / 2 - 20,
      });
      yPos += doc.splitTextToSize(`${q.text}`, pageWidth / 2 - 20).length * 5;

      let optionsText = q.options
        .map(
          (option: any, optionIndex: any) =>
            `${String.fromCharCode(65 + optionIndex)}) ${option}`
        )
        .join('   ');

      let lineWidth =
        (doc.getStringUnitWidth(optionsText) * doc.getFontSize()) /
        doc.internal.scaleFactor;
      if (lineWidth > pageWidth / 2 - 20) {
        // If options exceed half the page width, start a new line for each
        q.options.forEach((option: any, optionIndex: any) => {
          let optionLabel = `${String.fromCharCode(
            65 + optionIndex
          )}) ${option}`;
          doc.text(optionLabel, startX, yPos, {
            maxWidth: pageWidth / 2 - 20,
          });
          yPos +=
            doc.splitTextToSize(`${option}`, pageWidth / 2 - 20).length * 4;
          yPos += 1;
        });
      } else {
        // Options fit in one line
        doc.text(optionsText, startX, yPos);
        yPos += 5;
      }

      yPos += 3; // Additional space after each question

      //ans
      answersText += `${index + 1}. ${
        q.selectedOption === 0
          ? 'A'
          : q.selectedOption === 1
          ? 'B'
          : q.selectedOption === 2
          ? 'C'
          : q.selectedOption === 3
          ? 'D'
          : '???'
      }   `;
    });
    pdf.setFontSize(5);
    //pdf.text(answersText, startX, pdf.internal.pageSize.getHeight() - 5);

    const footer = 'Ši faila sugeneravo Skafis. www.skafis.lt';
    pdf.text(
      footer,
      startX + pdf.internal.pageSize.getWidth() / 2 - 50,
      pdf.internal.pageSize.getHeight() - 5
    );
  };

  // Start below the title
  const startY =
    20 + pdf.splitTextToSize(`${title}`, pageWidth / 2 - 20).length * 5;
  drawQuestions(pdf, questions, 10, startY); // Draw on the left half of the PDF
  drawQuestions(pdf, questions, pageCenter + 10, startY); // Draw on the right half of the PDF

  // Draw a vertical line down the middle of the page to separate both sides
  pdf.setDrawColor(0);
  pdf.setLineWidth(0.1);
  pdf.line(pageCenter, 0, pageCenter, pdf.internal.pageSize.getHeight());

  // Save the PDF
  pdf.save(`${form.value.title}.pdf`);
}
