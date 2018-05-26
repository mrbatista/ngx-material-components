import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		FlexLayoutModule,
		FormsModule,
		MatButtonModule,
		RouterModule
	],
	declarations: [HomeComponent]
})
export class HomeModule {}
