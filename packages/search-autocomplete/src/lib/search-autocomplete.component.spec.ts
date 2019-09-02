import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSearchAutocompleteComponent } from './search-autocomplete.component';

describe('MatSearchAutocompleteComponent', () => {
	let component: MatSearchAutocompleteComponent;
	let fixture: ComponentFixture<MatSearchAutocompleteComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ MatSearchAutocompleteComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MatSearchAutocompleteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
