import { Component } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'consent-modal-en',
  templateUrl: 'consent-modal-en.component.html',
  styleUrl: 'consent-modal-en.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatExpansionModule,
  ],
})
export class ConsentModalEnComponent {
  constructor(public dialogRef: MatDialogRef<ConsentModalEnComponent>) {}

  consent() {
    localStorage.setItem('CONSENT_GIVEN', 'true');
    document.getElementById('body')?.classList.remove('block-scroll');
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

  changeLanguage(): void {
    window.location.href = '';
  }
}
