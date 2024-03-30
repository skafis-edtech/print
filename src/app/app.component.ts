import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    // Initialize the form with a single control for the title
    this.titleForm = this.fb.group({
      title: ['', Validators.required], // Make the title field required
    });
  }

  // Function to be called when the form is submitted
  saveTitle(): void {
    const titleValue = this.titleForm.get('title')!.value;
    console.log('Saved Title:', titleValue);
    // Here you would typically handle the state update to save the title
  }
}
