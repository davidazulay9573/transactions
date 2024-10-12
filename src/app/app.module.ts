import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { SigninComponent } from './pages/signin/signin.component'; // Adjust the path as necessary
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [
   
  ],
  imports: [
    BrowserModule,
    AppComponent,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule { }
