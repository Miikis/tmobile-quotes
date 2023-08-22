import { Component } from '@angular/core';
import { QuotableApiService } from './quotable-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tmobile-quotes';

  results: any[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  rateLimit = { remaining: 0, total: 0 };
  searchError?: { type: string; message: string };
  currentSearchQuery: string = '';

  constructor(private quotableApiService: QuotableApiService) {}

  onSearchChange(query: string): void {
    this.currentSearchQuery = query;
    this.searchQuotes(this.currentSearchQuery, this.currentPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.searchQuotes(this.currentSearchQuery, page);
  }

  private searchQuotes(query: string, page: number): void {
    this.quotableApiService.search(query, 10, page).subscribe((response) => {
      this.results = response.results.results;
      this.rateLimit = response.rateLimit;
      this.searchError = response.error;
      this.totalPages = response.results.totalPages;
    });
  }
}
