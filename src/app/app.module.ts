import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchErrorComponent } from './search-error/search-error.component';
import { SearchResultsPaginationComponent } from './search-results-pagination/search-results-pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    SearchResultsComponent,
    SearchErrorComponent,
    SearchResultsPaginationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
