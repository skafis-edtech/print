import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { HomeEnComponent } from './home-en/home-en.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'en', component: HomeEnComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
