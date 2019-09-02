import { SearchAutocompleteModule } from './search-autocomplete.module';

describe('SearchAutocompleteModule', () => {
	let autocompleteModule: SearchAutocompleteModule;

	beforeEach(() => {
		autocompleteModule = new SearchAutocompleteModule();
	});

	it('should create an instance', () => {
		expect(autocompleteModule).toBeTruthy();
	});
});

