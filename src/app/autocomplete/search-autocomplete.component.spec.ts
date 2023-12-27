import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { SearchAutocompleteComponent } from "./search-autocomplete.component";

describe("SearchAutocompleteComponent", () => {
  let component: SearchAutocompleteComponent;
  let fixture: ComponentFixture<SearchAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchAutocompleteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
