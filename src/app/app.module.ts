import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        FormsModule,
        BrowserModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
