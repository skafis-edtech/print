import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConsentModalComponent } from '../consent-modal/consent-modal.component';

import { generateImagePDF, generateTextPDF } from './generate-pdf';
import { exampleABCD } from './form-example-jsons';
import { generateHTML } from './generate-html';
import { TitleDescriptionComponent } from './components/title-description/title-description.component';

export interface Questionaire {
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
  test: string = 'test';

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
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
    generateHTML(this.titleForm);
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

  ngOnInit() {
    window.addEventListener('consent-just-given', () => {
      this.loadForm();
      window.addEventListener('beforeunload', () => this.saveForm());
      this.titleForm.valueChanges.subscribe(() => {
        this.saveForm();
      });
    });
    if (localStorage.getItem('CONSENT_GIVEN') === 'true') {
      this.loadForm();
      window.addEventListener('beforeunload', () => this.saveForm());
      this.titleForm.valueChanges.subscribe(() => {
        this.saveForm();
      });
    }
  }

  saveForm() {
    localStorage.setItem('form', JSON.stringify(this.titleForm.value));
  }

  loadForm() {
    const form = localStorage.getItem('form');
    const formParsed = JSON.parse(form || '{}');
    if (form) {
      this.titleForm.patchValue(formParsed);
      this.rebuildFormGroups(formParsed.questions);
    }
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', () => this.saveForm());
    this.saveForm();
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

  fillExampleForm() {
    this.rebuildFormGroups(exampleABCD.questions);
    this.titleForm.get('title')?.setValue(exampleABCD.title);
  }

  generateImagePDF(): void {
    generateImagePDF(this.titleForm);
  }

  generateTextPDF(): void {
    generateTextPDF(this.titleForm);
  }
}
