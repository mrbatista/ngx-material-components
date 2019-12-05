import {
	Component,
	OnInit,
	Input,
	ViewChild,
	ElementRef,
	EventEmitter,
	Output,
	TemplateRef,
	OnDestroy,
	DoCheck,
	HostBinding,
	Optional,
	OnChanges,
	AfterViewInit,
	Host,
	HostListener,
} from '@angular/core';
import { MatAutocomplete, MatAutocompleteOrigin, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl, ControlValueAccessor, NgControl } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatFormFieldControl, MatFormField } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { MatInput } from '@angular/material/input';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import { takeUntil, take } from 'rxjs/operators';
import {DOWN_ARROW, LEFT_ARROW, ENTER} from '@angular/cdk/keycodes';

@Component({
	selector: 'mat-search-autocomplete',
	templateUrl: './search-autocomplete.html',
	styleUrls: ['./search-autocomplete.scss'],
	providers: [
		{
			provide: MatFormFieldControl,
			useExisting: MatSearchAutocompleteComponent,
		}
	],
	// tslint:disable-next-line: use-host-property-decorator
	host: {
		'[id]': 'id',
		'[attr.aria-describedby]': 'describedBy'
	}
})
export class MatSearchAutocompleteComponent implements OnInit, OnDestroy, OnChanges, DoCheck,
	AfterViewInit, ControlValueAccessor, MatFormFieldControl<MatInput> {
	static nextId = 0;

	@Output() optionSelected = new EventEmitter();

	@Output() createNew = new EventEmitter();

	@ViewChild('autocompleteInput', { static: false }) autocompleteInput: MatInput;

	@ViewChild('autocomplete', { static: false }) autocomplete: MatAutocomplete;

	@HostBinding() id = `mat-search-autocomplete-${MatSearchAutocompleteComponent.nextId++}`;

	stateChanges = new Subject<void>();

	_valueChanges = new Subject<any>();

	_destroyed = new Subject<void>();

	_value: any;

	_placeholder: string;

	_required = false;

	_disabled = false;

	focused: boolean;

	errorState = false;

	controlType = 'mat-search-autocomplete';

	selectedOption: any;

	public query: string;

	public autocompleteList: any[] | null;

	public noSuggestions: boolean;

	private storedItems?: any[];

	private service?: SearchAutocompleteService;

	private remote: boolean;

	showProgressBar: boolean;

	@Input() formControl: FormControl;

	@Input() autocompleteConnectedTo: MatAutocompleteOrigin;

	@Input() prefetch = false;

	@Input() displayPropertyItem ?= 'name';

	@Input() minChars = 2;

	@Input() showAddNew = false;

	@Input() addNewText = 'Add new';

	@Input() noSuggestionsText = 'Sorry, no suggestions were found';

	@Input() defaultFilterParams?: any;

	@Input() displayItemFn?: (item: any) => string;

	@Input() displayTemplate?: TemplateRef<any>;

	@Input() transformResult: any = (x: any[]) => x;

	// tslint:disable-next-line: member-ordering
	@HostBinding('attr.aria-describedby') describedBy = '';
	setDescribedByIds(ids: string[]) {
		this.describedBy = ids.join(' ');
	}

	@HostBinding('class.floating')
	get shouldLabelFloat() {
		return this.focused || !this.empty;
	}

	get empty() {
		if (this.autocompleteInput) {
			const { value } = this.autocompleteInput;
			return value.trim().length === 0 ? true : false;
		} else {
			return true;
		}
	}

	@Input()
	get value(): any {
		return this._value;
	}
	set value(value) {
		if (value !== this.value) {
			this._value = value;
			this.onChange(value);
			this.stateChanges.next();
		}
	}

	@Input()
	set source(value: any) {
		if (this.isAutocompleteService(value)) {
			this.remote = true;
			this.service = value as SearchAutocompleteService;
		} else if (value instanceof Array) {
			this.remote = false;
			this.storedItems = value.slice(0);
		}
	}

	@Input()
	get placeholder() {
		return this._placeholder;
	}
	set placeholder(plh) {
		this._placeholder = plh;
		this.stateChanges.next();
	}

	@Input()
	get required() {
		return this._required;
	}
	set required(req) {
		this._required = coerceBooleanProperty(req);
		this.stateChanges.next();
	}

	@Input()
	get disabled() {
		return this._disabled;
	}
	set disabled(dis) {
		this._disabled = coerceBooleanProperty(dis);
		this.stateChanges.next();
	}

	get showOptionCreateNew(): boolean {
		return this.query && this.noSuggestions && this.showAddNew;
	}

	get showOptionNoSuggestions(): boolean {
		return this.query && this.noSuggestions;
	}

	get showClearButton(): boolean {
		return this.selectedOption || this.query;
	}

	constructor(
		private readonly elRef: ElementRef<HTMLElement>,
		private readonly fm: FocusMonitor,
		@Optional() @Host() private _formField: MatFormField,
		@Optional() @Host() public ngControl: NgControl) {
		// Replace the provider from above with this.
		if (this.ngControl !== null) {
			// Setting the value accessor directly (instead of using
			// the providers) to avoid running into a circular import.
			this.ngControl.valueAccessor = this;
		}

		fm.monitor(elRef.nativeElement, true).subscribe(origin => {
			this.focused = !!origin;
			this.stateChanges.next();
		});
	}

	ngOnInit() {
		// Fix wrong autocomplete panel position
		if (!this.autocompleteConnectedTo && this._formField) {
			this.autocompleteConnectedTo = {elementRef: this._formField.getConnectedOverlayOrigin()};
		}

		if (this.prefetch) {
			if (!this.service) {
				throw new Error('Service for prefetch is not defined in \'Source\'');
			}

			this.prefetchData()
			.pipe(take(1))
			.subscribe();
		}

		this.registerFetchRemoteData();
	}

	ngAfterViewInit(): void {
		if (this.value) {
			this.autocompleteInput.value = this.value;
			this.stateChanges.next();
		}
		this.registerInputChange();
	}

	ngDoCheck(): void {
		if (this.ngControl) {
			this.errorState = this.ngControl.touched && (!this.selectedOption ||
				this.ngControl.invalid);
		} else {
			this.errorState = this.required && !this.selectedOption;
		}

		this.stateChanges.next();
	}

	ngOnChanges(): void {
		this.stateChanges.next();
	}

	ngOnDestroy(): void {
		this._valueChanges.complete();
		this.stateChanges.complete();
		this.fm.stopMonitoring(this.elRef.nativeElement);
		this._destroyed.next();
		this._destroyed.complete();
	}

	registerInputChange(): void {
		if (this.ngControl) {
			this.ngControl.valueChanges
			.pipe(takeUntil(this._destroyed))
			.subscribe(value => this.value = value);
		}
	}

	fetch(value: any): Observable<Array<any>> {
		if (this.remote) {
			if (this.prefetch) {
				return this.filterStoredItems(value);
			} else {
				return this.service.fetch(value, this.defaultFilterParams);
			}
		} else {
			return this.filterStoredItems(value);
		}
	}

	registerFetchRemoteData(): void {
		this._valueChanges
		.pipe(
			debounceTime(100),
			switchMap(value => this.fetch(value)),
			map((result) => this.transformResult(result)))
		.subscribe(result => {
			this.autocompleteList = result;
			this.showProgressBar = false;
			this.noSuggestions = result.length === 0;
			if (this.noSuggestions) {
				this.selectedOption = undefined;
			}
			this.stateChanges.next();
		});
	}

	filterStoredItems(value: any): Observable<Array<any>> {
		return new Observable(subscriber => {
			if (this.prefetch && this.storedItems.length === 0) {
				this.showProgressBar = true;
				this.prefetchData().subscribe(subscriber);
			} else {
				let autocompleteList = this.storedItems || [];

				if (value && value.length > 0) {
					autocompleteList = autocompleteList.filter(item => {
						const formatedItem = this.viewItem(item).toLowerCase();

						return formatedItem.indexOf(value.toLowerCase()) > -1;
					});
				}

				subscriber.next(autocompleteList);
			}
		});
	}


	onContainerClick(event: MouseEvent) {
		if ((event.target as Element).tagName.toLowerCase() !== 'input') {
			if (this.autocompleteInput) {
				setTimeout(() => {
					this.autocompleteInput.focus();
					this.stateChanges.next();
				});
			}
		}
	}

	private prefetchData(): Observable<Array<any>> {
		return this.service.fetch(undefined, this.defaultFilterParams)
			.pipe(tap((result) => this.storedItems = this.transformResult(result)));
	}

	autocompleteSelected($event: MatAutocompleteSelectedEvent) {
		this.query = this.autocompleteInput.value;
		const selected = $event.option.value;
		this.writeValue(selected);

		if (selected) {
			this.optionSelected.emit(selected);
		}
	}

	get autocompleteDisplayFn(): (item: any) => string {
		return (item: any) => item ? this.viewItem(item) : '';
	}

	@HostListener('keyup', ['$event'])
	public onKeyUpEvent(event: KeyboardEvent) {

		if (event.keyCode === ENTER) {
			event.preventDefault();
			event.stopImmediatePropagation();
		// prevent filtering results if arrow were pressed
		} else if (event.keyCode < LEFT_ARROW || event.keyCode > DOWN_ARROW) {
			const { value } = this.autocompleteInput;
			this.query = value;
			this.noSuggestions = false;

			if ((this.isEmptyValue(this.query) && this.minChars === 0) ||
				this.query.length >= this.minChars) {
				this.value = value;

				if (this.remoteData) {
					this.showProgressBar = true;
				}

				this._valueChanges.next(value);
			} else {
				this.autocompleteList = [];
				this.stateChanges.next();
			}
		} else {
			event.preventDefault();
			event.stopImmediatePropagation();
		}
	}

	onFocus(): void {
		if (this.selectedOption) {
			return;
		}

		const {value} = this.autocompleteInput;

		if (this.isEmptyValue(value) && this.minChars === 0) {
			if (this.remote && !this.prefetch) {
				this.showProgressBar = true;
			}
			this._valueChanges.next();
		}
	}

	viewItem(item: any) {
		if (this.displayItemFn) {
			return this.displayItemFn(item);
		}

		return item[this.displayPropertyItem];
	}

	get remoteData() {
		// check if search result returns from service or from local data
		// if prefetch is active only one request will be made on init
		return this.service && !this.prefetch;
	}

	onCreateNew($event) {
		$event.preventDefault();
		this.createNew.emit(this.query);
	}

	private isEmptyValue(value: string): boolean {
		return value.length <= 0;
	}

	private isAutocompleteService(object: any): boolean {
		return object && 'fetch' in object;
	}

	writeValue(value: any): void {
		this.selectedOption = value;

		if (value) {
			if (this.autocompleteInput) {
				this.autocompleteInput.value = this.viewItem(this.selectedOption);
				this.autocompleteList = [];
			}
		}

		this.onChange(value);
	}

	onChange = (_: any) => {};
	onTouched = () => { };

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}
}

export interface SearchAutocompleteService {
	fetch(value?: string, defaultFilter?: any): Observable<any>;
}

