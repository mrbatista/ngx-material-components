import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatLoadingBarComponent } from './loading-bar.component';

describe('MatLoadingBarComponent', () => {
	let component: MatLoadingBarComponent;
	let fixture: ComponentFixture<MatLoadingBarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ MatLoadingBarComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MatLoadingBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
