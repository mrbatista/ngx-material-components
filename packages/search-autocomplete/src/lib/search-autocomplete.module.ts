import { NgModule } from '@angular/core';
import { MatSearchAutocompleteComponent } from './search-autocomplete.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
	declarations: [
		MatSearchAutocompleteComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		MatSelectModule,
		MatAutocompleteModule,
		MatIconModule,
		MatProgressBarModule,
	],
	exports: [
		MatSearchAutocompleteComponent,
	]
})
export class MatSearchAutocompleteModule { }
