import { FormControl } from '@angular/forms';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { TRANSLATIONS } from '../app.tranlastions';
import { ActivatedRoute, Router } from '@angular/router';

interface Questionaire {
  title: FormControl<string>;
  questions: FormArray<FormControl<Question>>;
}

interface Question {
  text: FormControl<string>;
  options: FormArray<FormControl<string>>;
  selectedOption: FormControl<number>;
}

@Component({
  templateUrl: './home-en.component.html',
  styleUrls: ['./home-en.component.scss'],
})
export class HomeEnComponent {
  titleForm: FormGroup<Questionaire>;

  constructor(private fb: FormBuilder, private router: Router) {
    this.titleForm = this.fb.nonNullable.group({
      title: this.fb.nonNullable.control<string>('', Validators.required),
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
      text: this.fb.nonNullable.control<string>('', Validators.required),
      options: this.fb.nonNullable.array<FormControl<string>>([
        this.fb.nonNullable.control<string>('', Validators.required),
        this.fb.nonNullable.control<string>('', Validators.required),
        this.fb.nonNullable.control<string>('', Validators.required),
        this.fb.nonNullable.control<string>('', Validators.required),
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
    const htmlStart = `<!DOCTYPE html>\r\n<html lang=\"en\">\r\n  <head>\r\n    <meta charset=\"UTF-8\" \/>\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" \/>\r\n    <title>`;
    const htmlStart2 = `<\/title>\r\n    <script src=\"https:\/\/polyfill.io\/v3\/polyfill.min.js?features=es6\"><\/script>\r\n    <style>\r\n      body {\r\n        font-family: Arial, sans-serif;\r\n        background-color: #f4f4f4;\r\n        padding: 20px;\r\n      }\r\n      .container {\r\n        width: 80%;\r\n        margin: auto;\r\n        overflow: hidden;\r\n      }\r\n      .question {\r\n        background: #fff;\r\n        padding: 15px;\r\n        margin-bottom: 20px;\r\n        border-radius: 8px;\r\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\r\n      }\r\n      .question h3 {\r\n        margin-bottom: 10px;\r\n      }\r\n      label {\r\n        display: block;\r\n        margin: 5px 0;\r\n      }\r\n      .btn {\r\n        display: inline-block;\r\n        padding: 8px 15px;\r\n        margin: 10px 0;\r\n        border: none;\r\n        border-radius: 4px;\r\n        background: #333;\r\n        color: #fff;\r\n        cursor: pointer;\r\n      }\r\n      .btn:hover {\r\n        background: #555;\r\n      }\r\n      .correct {\r\n        color: green;\r\n      }\r\n      .incorrect {\r\n        color: red;\r\n      }\r\n\r\n      .description {\r\n        background-color: #f9f9f9;\r\n        padding: 10px 20px;\r\n        margin-bottom: 20px;\r\n        font-size: 1.1em;\r\n        color: #333;\r\n      }\r\n\r\n      .description h2 {\r\n        font-size: 1.4em;\r\n        margin-top: 0;\r\n      }\r\n\r\n      .description p {\r\n        line-height: 1.6;\r\n        margin: 10px 0;\r\n      }\r\n\r\n      .description {\r\n        background-color: #f9f9f9;\r\n        border-left: 4px solid #333;\r\n        padding: 10px 20px;\r\n        margin: auto;\r\n        margin-bottom: 20px;\r\n        font-size: 1.1em;\r\n        color: #333;\r\n        width: 77%;\r\n        margin-left: 10%;\r\n      }\r\n\r\n      .description h2 {\r\n        font-size: 1.4em;\r\n        margin-top: 0;\r\n      }\r\n\r\n      .description p {\r\n        line-height: 1.6;\r\n        margin: 10px 0;\r\n      }\r\n    <\/style>\r\n  <\/head>\r\n  <body>\r\n    <div class=\"description\"><h1>`;
    const htmlStart3 = `</h1><\/div>\r\n\r\n    <div class=\"container\">\r\n      <!-- Questions will be inserted here by JavaScript -->\r\n    <\/div>\r\n\r\n    <script>\r\n      document.addEventListener(\"DOMContentLoaded\", function () {\r\n        \/\/THIS WILL BE CUSTOMIZED BY USER-----------------------------------------------\r\n        `;
    const htmlEnd =
      '\r\n        function createQuestionElement(question, index) {\r\n          const div = document.createElement("div");\r\n          div.className = "question";\r\n\r\n          let content = `<h3>${question.question}</h3>`;\r\n\r\n          content += question.options\r\n            .map(\r\n              (option, i) => `\r\n                      <label>\r\n                          <input type="radio" name="question${index}" value="${i}"> ${option}\r\n                      </label>\r\n                  `\r\n            )\r\n            .join("");\r\n\r\n          content += `<button class="btn">Patikrinti atsakym\u0105</button>\r\n                      <span class="feedback"></span>`;\r\n\r\n          div.innerHTML = content;\r\n\r\n          const btn = div.querySelector(".btn");\r\n          btn.addEventListener("click", function () {\r\n            checkAnswer(index, btn, question.type);\r\n          });\r\n\r\n          return div;\r\n        }\r\n\r\n        function checkAnswer(questionIndex, button, type) {\r\n          const feedback = button.nextElementSibling;\r\n\r\n          const selected = document.querySelector(\r\n            `input[name="question${questionIndex}"]:checked`\r\n          );\r\n          if (selected) {\r\n            const isCorrect = questions[questionIndex].answer == selected.value;\r\n            feedback.textContent = isCorrect ? "Teisingai!" : "Neteisingai!";\r\n            feedback.className =\r\n              "feedback " + (isCorrect ? "correct" : "incorrect");\r\n          } else {\r\n            feedback.textContent = "Pasirinkite atsakym\u0105.";\r\n            feedback.className = "feedback";\r\n          }\r\n        }\r\n        const container = document.querySelector(".container");\r\n        questions.forEach((question, index) => {\r\n          container.appendChild(createQuestionElement(question, index));\r\n        });\r\n      });\r\n    </script>\r\n  </body>\r\n</html>\r\n';
    let data = 'const questions = [';
    this.titleForm.value.questions?.forEach(
      (question) =>
        (data += `\n  {\n    question: "${
          question.text
        }",\n    options: ["${question.options.at(0)}", "${question.options.at(
          1
        )}", "${question.options.at(2)}", "${question.options.at(
          3
        )}"],\n    answer: ${question.selectedOption},\n  },`)
    );
    data += `        ];\r\n    //END OF CUSTOMIZABLE CONTENT---------------------------------------------------\r\n\r\n`;
    const genHtml =
      htmlStart +
      this.titleForm.value.title +
      htmlStart2 +
      this.titleForm.value.title +
      htmlStart3 +
      data +
      htmlEnd;

    const blob = new Blob([genHtml], {
      type: 'application/octet-stream',
    });
    const fileUrl = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = `${this.titleForm.value.title} - generated test.html`;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    window.URL.revokeObjectURL(fileUrl);
  }

  changeLanguage(): void {
    window.location.href = '';
  }
}
