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
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'consent-modal',
  templateUrl: 'consent-modal.component.html',
  styleUrl: 'consent-modal.component.scss',
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
export class ConsentModalComponent {
  constructor(public dialogRef: MatDialogRef<ConsentModalComponent>) {}

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

    window.dispatchEvent(new Event('consent-just-given'));
  }

  changeLanguage(): void {
    window.location.href = 'en';
  }
}
