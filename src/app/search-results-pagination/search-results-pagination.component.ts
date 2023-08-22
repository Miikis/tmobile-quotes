import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-results-pagination',
  templateUrl: './search-results-pagination.component.html',
  styleUrls: ['./search-results-pagination.component.css'],
})
export class SearchResultsPaginationComponent {
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  @Input() maxButtons: number = 6; // Maximum number of buttons, including ellipsis
  @Output() pageChange = new EventEmitter<number>();

  get middlePages(): number[] {
    const pages = [];
    const start = Math.max(
      2,
      this.currentPage - Math.floor((this.maxButtons - 4) / 2)
    );
    const end = Math.min(
      this.totalPages - 1,
      this.currentPage + Math.floor((this.maxButtons - 4) / 2)
    );
    const visibleMiddlePages = Math.min(end - start + 1, this.maxButtons - 4);
    for (let i = 0; i < visibleMiddlePages; i++) {
      pages.push(start + i);
    }
    return pages;
  }

  showFirstEllipsis(): boolean {
    return this.currentPage - Math.floor((this.maxButtons - 4) / 2) > 2;
  }

  showLastEllipsis(): boolean {
    return (
      this.currentPage + Math.floor((this.maxButtons - 4) / 2) <
      this.totalPages - 1
    );
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.pageChange.emit(page);
  }
}
