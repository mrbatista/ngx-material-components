import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchAutocompleteComponent } from './search-autocomplete.component';
import { MatSearchAutocompleteModule } from '@mrbatista/mat-search-autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { DataService } from './search-autcomplete.service';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		FlexLayoutModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatSearchAutocompleteModule,
	],
	declarations: [
		SearchAutocompleteComponent,
	],
	providers: [
		DataService,
	]
})
export class SearchAutocompleteModule { }
