import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material';
import { MatLoadingBarComponent } from './loading-bar.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
		MatProgressBarModule,
	],
	declarations: [MatLoadingBarComponent],
	exports: [MatLoadingBarComponent]
})
export class MatLoadingBarModule {}
