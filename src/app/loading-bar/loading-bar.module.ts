import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingBarComponent } from './loading-bar.component';
import { MatLoadingBarModule } from '@mrbatista/mat-loading-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		FlexLayoutModule,
		FormsModule,
		MatCheckboxModule,
		MatButtonModule,
		MatRadioModule,
		MatLoadingBarModule
	],
	declarations: [LoadingBarComponent]
})
export class LoadingBarModule {}
