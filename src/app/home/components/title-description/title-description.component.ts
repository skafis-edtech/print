import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
@Component({
  selector: 'app-title-description',
  standalone: true,
  imports: [
    MatCardModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
  ],
  exportAs: 'appTitleDescription',
  templateUrl: './title-description.component.html',
  styleUrl: './title-description.component.scss',
})
export class TitleDescriptionComponent {
  copied: boolean = false;
  constructor(private clipboard: Clipboard) {}

  changeLanguage(): void {
    window.location.href = 'en';
  }

  copyBankDetails() {
    this.clipboard.copy('Naglis Šuliokas LT943250092929077836');
    this.copied = true;
  }
}
