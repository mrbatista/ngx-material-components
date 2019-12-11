import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from './search-autcomplete.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-search-autocomplete',
	templateUrl: './search-autocomplete.component.html',
	styleUrls: ['./search-autocomplete.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchAutocompleteComponent implements OnInit {

	ctrl = new FormControl();

	ctrl2 = new FormControl(undefined, Validators.required);

	disableAutocompleteCtrl = new FormControl();

	readonly _destroy = new Subject<void>();

	items = [
		{ name: 'Afghanistan', code: 'AF' },
		{ name: 'land Islands', code: 'AX' },
		{ name: 'Albania', code: 'AL' },
		{ name: 'Algeria', code: 'DZ' },
		{ name: 'American Samoa', code: 'AS' },
		{ name: 'AndorrA', code: 'AD' },
		{ name: 'Angola', code: 'AO' },
		{ name: 'Anguilla', code: 'AI' },
		{ name: 'Antarctica', code: 'AQ' },
		{ name: 'Antigua and Barbuda', code: 'AG' },
	];

	displayItemFn = (item: any) => `name: ${item.name} | code: ${item.code}`;

	constructor(readonly dataService: DataService) { }

	ngOnInit(): void {
		this.disableAutocompleteCtrl.valueChanges
			.pipe(takeUntil(this._destroy))
			.subscribe({
				next: value => value ? this.ctrl.disable() : this.ctrl.enable(),
			});
	}

	clear(): void {
		this.ctrl.setValue(null);
	}

	clear2(): void {
		this.ctrl2.setValue(null);
	}
}
