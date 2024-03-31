import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { DomSanitizer } from '@angular/platform-browser';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
  ],
})
export class AppComponent {
  titleForm: FormGroup<Questionaire>;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {
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
    const htmlStart = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${this.titleForm.value.title}</title>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .container {
            width: 80%;
            margin: auto;
            overflow: hidden;
          }
          .question {
            background: #fff;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .question h3 {
            margin-bottom: 10px;
          }
          label {
            display: block;
            margin: 5px 0;
          }
          .btn {
            display: inline-block;
            padding: 8px 15px;
            margin: 10px 0;
            border: none;
            border-radius: 4px;
            background: #333;
            color: #fff;
            cursor: pointer;
          }
          .btn:hover {
            background: #555;
          }
          .correct {
            color: green;
          }
          .incorrect {
            color: red;
          }
    
          .description {
            background-color: #f9f9f9;
            padding: 10px 20px;
            margin-bottom: 20px;
            font-size: 1.1em;
            color: #333;
          }
    
          .description h2 {
            font-size: 1.4em;
            margin-top: 0;
          }
    
          .description p {
            line-height: 1.6;
            margin: 10px 0;
          }
    
          .description {
            background-color: #f9f9f9;
            border-left: 4px solid #333;
            padding: 10px 20px;
            margin: auto;
            margin-bottom: 20px;
            font-size: 1.1em;
            color: #333;
            width: 77%;
            margin-left: 10%;
          }
    
          .description h2 {
            font-size: 1.4em;
            margin-top: 0;
          }
    
          .description p {
            line-height: 1.6;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="description"><h1>${this.titleForm.value.title}</h1></div>
    
        <div class="container">
          <!-- Questions will be inserted here by JavaScript -->
        </div>
    
        <script>
          document.addEventListener("DOMContentLoaded", function () {
            `;
    const htmlEnd =
      '\r\n        function createQuestionElement(question, index) {\r\n          const div = document.createElement("div");\r\n          div.className = "question";\r\n\r\n          let content = `<h3>${question.question}</h3>`;\r\n\r\n          content += question.options\r\n            .map(\r\n              (option, i) => `\r\n                      <label>\r\n                          <input type="radio" name="question${index}" value="${i}"> ${option}\r\n                      </label>\r\n                  `\r\n            )\r\n            .join("");\r\n\r\n          content += `<button class="btn">Patikrinti atsakym\u0105</button>\r\n                      <span class="feedback"></span>`;\r\n\r\n          div.innerHTML = content;\r\n\r\n          const btn = div.querySelector(".btn");\r\n          btn.addEventListener("click", function () {\r\n            checkAnswer(index, btn, question.type);\r\n          });\r\n\r\n          return div;\r\n        }\r\n\r\n        function checkAnswer(questionIndex, button, type) {\r\n          const feedback = button.nextElementSibling;\r\n\r\n          const selected = document.querySelector(\r\n            `input[name="question${questionIndex}"]:checked`\r\n          );\r\n          if (selected) {\r\n            const isCorrect = questions[questionIndex].answer == selected.value;\r\n            feedback.textContent = isCorrect ? "Teisingai!" : "Neteisingai!";\r\n            feedback.className =\r\n              "feedback " + (isCorrect ? "correct" : "incorrect");\r\n          } else {\r\n            feedback.textContent = "Pasirinkite atsakym\u0105.";\r\n            feedback.className = "feedback";\r\n          }\r\n        }\r\n        const container = document.querySelector(".container");\r\n        questions.forEach((question, index) => {\r\n          container.appendChild(createQuestionElement(question, index));\r\n        });\r\n      });\r\n    </script>\r\n  </body>\r\n</html>\r\n';

    let data = htmlStart + 'const questions = [';

    this.titleForm.value.questions?.forEach(
      (question) =>
        (data += `\n\t{\n\t\tquestion: "${
          question.text
        }",\n\t\toptions: ["${question.options.at(0)}", "${question.options.at(
          1
        )}", "${question.options.at(2)}", "${question.options.at(
          3
        )}"],\n\t\tanswer: ${question.selectedOption},\n\t},`)
    );

    data += '];' + htmlEnd;

    const blob = new Blob([data], {
      type: 'application/octet-stream',
    });
    const fileUrl = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'generatedTest.html';

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    window.URL.revokeObjectURL(fileUrl);
  }
}
