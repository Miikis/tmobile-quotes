import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsPaginationComponent } from './search-results-pagination.component';

describe('SearchResultsPaginationComponent', () => {
  let component: SearchResultsPaginationComponent;
  let fixture: ComponentFixture<SearchResultsPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsPaginationComponent]
    });
    fixture = TestBed.createComponent(SearchResultsPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
