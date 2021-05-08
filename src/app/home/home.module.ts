import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    BrowserModule,
    SearchComponent,
    RouterModule.forChild([
      {path: '', component: HomeComponent},
  ]),
  ],
  providers: []
})
export class AppModule { }
