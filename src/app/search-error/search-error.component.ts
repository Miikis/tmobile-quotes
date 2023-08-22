import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-error',
  templateUrl: './search-error.component.html',
  styleUrls: ['./search-error.component.css'],
})
export class SearchErrorComponent {
  @Input() error?: { type: string; message: string };
}
