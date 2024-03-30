import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

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
  ],
})
export class AppComponent {
  titleForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.titleForm = this.fb.group({
      title: ['', Validators.required],
      questions: this.fb.array([]),
    });

    this.addQuestion();
  }

  get questions(): FormArray {
    return this.titleForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    this.questions.push(this.fb.control(''));
  }

  saveTitle(): void {
    const value = this.titleForm.value;
    console.log('value: ', value);
  }
}
