import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MatCheckboxModule, MatButtonModule, MatRadioModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { appRoutes } from './app.route';
import { LoadingBarModule } from './loading-bar/loading-bar.module';
import { HomeModule } from './home/home.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		LoadingBarModule,
		HomeModule,
		RouterModule.forRoot(appRoutes)
	],
	bootstrap: [AppComponent]
})

export class AppModule {}
