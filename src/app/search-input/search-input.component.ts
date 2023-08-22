import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
})
export class SearchInputComponent {
  searchControl = new FormControl();

  @Output() searchChange = new EventEmitter<string>();

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => this.searchChange.emit(value));
  }
}
