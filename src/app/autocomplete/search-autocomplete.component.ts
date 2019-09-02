import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from './search-autcomplete.service';

@Component({
	selector: 'app-search-autocomplete',
	templateUrl: './search-autocomplete.component.html',
	styleUrls: ['./search-autocomplete.component.scss']
})
export class SearchAutocompleteComponent implements OnInit {

	ctrl = new FormControl();
	ctrl2 = new FormControl();

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

	service: DataService;

	displayItemFn = (item: any) => `name: ${item.name} | code: ${item.code}`;

	constructor(private readonly dataService: DataService) { }

	ngOnInit(): void {
		this.service = this.dataService;

	}

	clear(): void {
		this.ctrl.setValue(null);
	}

	clear2(): void {
		this.ctrl2.setValue(null);
	}
}
