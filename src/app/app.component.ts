import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

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

  constructor(private fb: FormBuilder) {
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
    const value = this.titleForm.value;
    console.log('Form Data:', value);
  }
}
