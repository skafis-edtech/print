import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatDialog } from '@angular/material/dialog';
import { ConsentModalComponent } from '../consent-modal/consent-modal.component';
import { jsPDF } from 'jspdf';

interface Questionaire {
  title: FormControl<string>;
  questions?: FormArray<FormControl<Question>>;
}

interface Question {
  text?: FormControl<string>;
  options?: FormArray<FormControl<string>>;
  selectedOption?: FormControl<number>;
}

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  titleForm: FormGroup<Questionaire>;
  copied: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clipboard: Clipboard,
    public dialog: MatDialog
  ) {
    const consentGiven = localStorage.getItem('CONSENT_GIVEN');
    if (!consentGiven) {
      this.openDialog('0ms', '0ms');
    } else {
      let script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-9D2B9RSBPT';
      let script2 = document.createElement('script');
      script2.textContent = `window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "G-9D2B9RSBPT");`;
      document.getElementById('head')?.appendChild(script);
      document.getElementById('head')?.appendChild(script2);
    }
    this.titleForm = this.fb.nonNullable.group<Questionaire>({
      title: this.fb.nonNullable.control<string>(''),
      questions: this.fb.nonNullable.array<Question>([]),
    });
    this.addQuestion();
  }

  get questions(): FormArray {
    return this.titleForm.get('questions') as FormArray;
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  addQuestion(): void {
    const questionGroup = this.fb.group<Question>({
      text: this.fb.nonNullable.control<string>(''),
      options: this.fb.nonNullable.array<FormControl<string>>([
        this.fb.nonNullable.control<string>(''),
        this.fb.nonNullable.control<string>(''),
        this.fb.nonNullable.control<string>(''),
        this.fb.nonNullable.control<string>(''),
      ]),
      selectedOption: this.fb.nonNullable.control<number>(
        0,
        Validators.required
      ),
    });

    this.questions.push(questionGroup);
  }

  removeLastQuestion(): void {
    const questions = this.questions;
    if (questions.length > 1) {
      questions.removeAt(questions.length - 1);
    }
  }

  generateHTML(): void {
    const htmlFill1 = `<!DOCTYPE html>\r\n<html lang=\"en\">\r\n  <head>\r\n    <meta charset=\"UTF-8\" \/>\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" \/>\r\n    <!-- CUSTOMIZABLE CONTENT -->\r\n    <title>`;
    const htmlFill2 = `<\/title>\r\n    <!-- END OF CUSTOMIZABLE CONTENT -->\r\n    <style>\r\n      body {\r\n        font-family: Arial, sans-serif;\r\n        background-color: #f4f4f4;\r\n        padding: 20px;\r\n      }\r\n      .container {\r\n        width: 40%;\r\n        margin: auto;\r\n        overflow: hidden;\r\n      }\r\n      .question {\r\n        background: #fff;\r\n        padding: 15px;\r\n        margin-bottom: 20px;\r\n        border-radius: 8px;\r\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\r\n      }\r\n      .question h3 {\r\n        margin-bottom: 10px;\r\n      }\r\n      label {\r\n        display: block;\r\n        margin: 5px 0;\r\n      }\r\n      .btn {\r\n        display: inline-block;\r\n        padding: 8px 15px;\r\n        margin: 10px 0;\r\n        border: none;\r\n        border-radius: 4px;\r\n        background: #333;\r\n        color: #fff;\r\n        cursor: pointer;\r\n      }\r\n      .btn:hover {\r\n        background: #555;\r\n      }\r\n      .correct {\r\n        color: green;\r\n      }\r\n      .incorrect {\r\n        color: red;\r\n      }\r\n      .feedback {\r\n        margin-left: 20px;\r\n      }\r\n      .description h1 {\r\n        font-size: 52px;\r\n        text-align: center;\r\n        width: 40%;\r\n        margin: auto;\r\n        margin-bottom: 20px;\r\n        padding-top: 1em;\r\n        padding-bottom: 1em;\r\n      }\r\n\r\n      #mobile-warning {\r\n        background-color: #ffcc00;\r\n        width: 40%;\r\n        margin: auto;\r\n        color: #333;\r\n        padding: 15px;\r\n        margin-bottom: 20px;\r\n        border-radius: 5px;\r\n        border: 1px solid #f90;\r\n        font-size: 1em;\r\n        font-weight: bold;\r\n      }\r\n      .question label {\r\n        display: block;\r\n        margin: 10px 0;\r\n        padding: 5px 0;\r\n        background-color: #f8f8f8;\r\n        border-radius: 4px;\r\n      }\r\n      input[type=\"radio\"] {\r\n        transform: scale(1.5);\r\n        margin: 10px;\r\n      }\r\n      @media (max-width: 768px) {\r\n        .container {\r\n          width: 90%;\r\n          margin: auto;\r\n        }\r\n        .description {\r\n          width: 90%;\r\n          margin: auto;\r\n          margin-bottom: 20px;\r\n        }\r\n        #mobile-warning {\r\n          width: 90%;\r\n          margin: auto;\r\n          margin-bottom: 20px;\r\n        }\r\n        .description h1 {\r\n          width: 90%;\r\n          margin: auto;\r\n          padding-top: 0.5em;\r\n          padding-bottom: 0.5em;\r\n          font-size: 40px;\r\n        }\r\n      }\r\n      footer {\r\n        text-align: center;\r\n      }\r\n    <\/style>\r\n  <\/head>\r\n  <body>\r\n    <!-- CUSTOMIZABLE CONTENT -->\r\n    <header class=\"description\"><h1>`;
    const htmlFill3 = `<\/h1><\/header>\r\n    <!-- END OF CUSTOMIZABLE CONTENT -->\r\n    <div id=\"mobile-warning\">\r\n      J\u016Bs galimai \u017Ei\u016Brite \u0161\u012F fail\u0105 per mobil\u0173j\u012F \u012Frengin\u012F. D\u0117l \u0161ios prie\u017Easties\r\n      J\u016Bs negal\u0117site pasitikrinti atsakym\u0173 \u2013 tam prireiks atsidaryti fail\u0105 per\r\n      kompiuter\u012F.\r\n    <\/div>\r\n    <div class=\"container\">\r\n      <!-- CUSTOMIZABLE CONTENT -->\r\n`;
    const htmlFill4 = `      <!-- END OF CUSTOMIZABLE CONTENT -->\r\n    <\/div>\r\n    <footer>\r\n      <p>\u0160\u012F fail\u0105 sugeneravo Skafis<\/p>\r\n      <p>\r\n        <a href=\"https:\/\/www.skafis.lt\" target=\"_blank\" rel=\"noreferrer\"\r\n          >skafis.lt<\/a\r\n        >\r\n      <\/p>\r\n    <\/footer>\r\n    <script>\r\n      document.addEventListener(\"DOMContentLoaded\", function () {\r\n        const questionDivs = document.querySelectorAll(\".question\");\r\n\r\n        function appendElements(questionDiv, index) {\r\n          const button = document.createElement(\"button\");\r\n          button.className = \"btn\";\r\n          button.textContent = \"Patikrinti atsakym\u0105\";\r\n          button.onclick = function () {\r\n            checkAnswer(index);\r\n          };\r\n\r\n          const feedbackSpan = document.createElement(\"span\");\r\n          feedbackSpan.className = \"feedback\";\r\n\r\n          questionDiv.appendChild(button);\r\n          questionDiv.appendChild(feedbackSpan);\r\n        }\r\n\r\n        function checkAnswer(questionIndex) {\r\n          const selected = document.querySelector(\r\n            \'input[name=\"question\' + questionIndex + \'\"]:checked\'\r\n          );\r\n          const feedback =\r\n            document.querySelectorAll(\".feedback\")[questionIndex];\r\n\r\n          if (!selected) {\r\n            feedback.textContent = \"Pasirinkite atsakym\u0105\";\r\n            feedback.className = \"feedback incorrect\";\r\n            return;\r\n          }\r\n\r\n          const isCorrect = selected.hasAttribute(\"correct\");\r\n          feedback.textContent = isCorrect ? \"Teisingai!\" : \"Neteisingai!\";\r\n          feedback.className =\r\n            \"feedback \" + (isCorrect ? \"correct\" : \"incorrect\");\r\n        }\r\n\r\n        questionDivs.forEach((div, index) => {\r\n          appendElements(div, index);\r\n        });\r\n\r\n        document.getElementById(\"mobile-warning\").remove();\r\n      });\r\n    <\/script>\r\n  <\/body>\r\n<\/html>\r\n`;
    let questionData = '';
    this.titleForm.value.questions?.forEach((question, index) => {
      questionData += `      <div class="question">
      <h3>${index + 1}. ${question.text}</h3>
      <label
        ><input type="radio" name="question${index}" ${
        this.titleForm.get(['questions', index, 'selectedOption'])?.value === 0
          ? 'correct'
          : ''
      } />
        <strong>A&ensp;&ensp;&ensp;</strong>${question.options?.at(0)}</label
      >
      <label
        ><input type="radio" name="question${index}" ${
        this.titleForm.get(['questions', index, 'selectedOption'])?.value === 1
          ? 'correct'
          : ''
      }/>
        <strong>B&ensp;&ensp;&ensp;</strong>${question.options?.at(1)}</label
      >
      <label
        ><input type="radio" name="question${index}" ${
        this.titleForm.get(['questions', index, 'selectedOption'])?.value === 2
          ? 'correct'
          : ''
      }/>
        <strong>C&ensp;&ensp;&ensp;</strong>${question.options?.at(2)}</label
      >
      <label
        ><input type="radio" name="question${index}" ${
        this.titleForm.get(['questions', index, 'selectedOption'])?.value === 3
          ? 'correct'
          : ''
      }/>
        <strong>D&ensp;&ensp;&ensp;</strong>${question.options?.at(3)}</label
      >
    </div>
  
  `;
    });

    const genHtml =
      htmlFill1 +
      this.titleForm.value.title +
      htmlFill2 +
      this.titleForm.value.title +
      htmlFill3 +
      questionData +
      htmlFill4;

    const blob = new Blob([genHtml], {
      type: 'application/octet-stream',
    });

    const fileUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = `${this.titleForm.value.title}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(fileUrl);
  }

  changeLanguage(): void {
    window.location.href = 'en';
  }

  copyBankDetails() {
    this.clipboard.copy('Naglis Šuliokas LT943250092929077836');
    this.copied = true;
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(ConsentModalComponent, {
      width: '500px',
      disableClose: true,
      enterAnimationDuration,
      exitAnimationDuration,
    });
    document.getElementById('body')?.classList.add('block-scroll');
  }

  generateTextPDF(): void {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageCenter = pageWidth / 2;
    const title = this.titleForm.value.title || 'NO TITLE';

    pdf.setFont('times', 'normal');

    //TITLE
    pdf.setFontSize(14);
    pdf.text(title, pageWidth / 4, 10, { align: 'center' }); // Center title in the first half
    pdf.text(title, (pageWidth / 4) * 3, 10, { align: 'center' }); // Center title in the second half

    const questions = this.titleForm.value.questions;
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
        doc.text(`${index + 1}. ${q.text}`, startX, yPos);
        yPos += 5;

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
            doc.text(optionLabel, startX, yPos);
            yPos += 4; // Increment y position for each option
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
      pdf.text(answersText, startX, pdf.internal.pageSize.getHeight() - 5);

      const footer = 'Ši faila sugeneravo Skafis. www.skafis.lt';
      pdf.text(
        footer,
        startX + pdf.internal.pageSize.getWidth() / 2 - 50,
        pdf.internal.pageSize.getHeight() - 5
      );
    };

    // Start below the title
    const startY = 20;
    drawQuestions(pdf, questions, 10, startY); // Draw on the left half of the PDF
    drawQuestions(pdf, questions, pageCenter + 10, startY); // Draw on the right half of the PDF

    // Draw a vertical line down the middle of the page to separate both sides
    pdf.setDrawColor(0);
    pdf.setLineWidth(0.1);
    pdf.line(pageCenter, 0, pageCenter, pdf.internal.pageSize.getHeight());

    // Save the PDF
    pdf.save(`${this.titleForm.value.title}.pdf`);
  }

  generateImagePDF(): void {
    const SCALING_FACTOR = 3;

    var canvas = document.createElement('canvas');
    canvas.width = 595 * SCALING_FACTOR;
    canvas.height = 842 * SCALING_FACTOR;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pageWidth = canvas.width;
    const pageCenter = pageWidth / 2;
    const title = this.titleForm.value.title || 'NO TITLE';

    ctx.textBaseline = 'bottom';

    // Draw title
    ctx.font = `${20 * SCALING_FACTOR}px Times New Roman`;
    ctx.textAlign = 'center';
    ctx.fillText(title, pageCenter, 40 * SCALING_FACTOR);
    ctx.textAlign = 'left';

    const questions = this.titleForm.value.questions;

    let yPos = 80 * SCALING_FACTOR;
    let answersText = 'Atsakymai:   ';

    ctx.font = `${15 * SCALING_FACTOR}px Times New Roman`;

    questions?.forEach((q: any, index: any) => {
      if (!ctx) return;

      ctx.fillText(`${index + 1}. ${q.text}`, 40 * SCALING_FACTOR, yPos);
      yPos += 20 * SCALING_FACTOR;

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
          let optionLabel = `${String.fromCharCode(
            65 + optionIndex
          )}) ${option}`;
          if (!ctx) return;
          ctx.fillText(optionLabel, 40 * SCALING_FACTOR, yPos);
          yPos += 15 * SCALING_FACTOR; // Increment y position for each option
        });
      } else {
        // Options fit in one line
        ctx.fillText(optionsText, 40 * SCALING_FACTOR, yPos);
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
    doc.save(`${this.titleForm.value.title}.pdf`);
  }

  ngOnInit() {
    this.loadForm();
    window.addEventListener('beforeunload', () => this.saveForm());
  }

  saveForm() {
    localStorage.setItem('form', JSON.stringify(this.titleForm.value));
  }

  loadForm() {
    const form = JSON.parse(localStorage.getItem('form') || '{}');
    if (form) {
      this.titleForm.patchValue(form);
      // Assuming you have a method to rebuild the form groups for questions and options
      this.rebuildFormGroups(form.questions);
    }
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', () => this.saveForm());
    this.saveForm(); // Save when component is destroyed
  }

  rebuildFormGroups(questions: any) {
    const formArray = this.titleForm.get('questions') as FormArray;
    formArray.clear();
    questions.forEach((question: any) => {
      const questionGroup = this.fb.group<Question>({
        text: this.fb.nonNullable.control(question.text),
        options: this.fb.nonNullable.array(
          question.options.map((option: any) => this.fb.control(option))
        ),
        selectedOption: this.fb.control(question.selectedOption),
      });
      formArray.push(questionGroup);
    });
  }

  clearForm() {
    const formArray = this.titleForm.get('questions') as FormArray;
    formArray.clear();
    this.titleForm.reset();
    this.addQuestion();
  }
}
