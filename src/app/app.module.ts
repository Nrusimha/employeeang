import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';


import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { EmployeeDashboardComponent } from './EmployeeDashboardComponent';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule ,
    BrowserModule,
    AppRoutingModule,
    NgxCsvParserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
