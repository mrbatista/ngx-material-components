import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.route';
import { LoadingBarModule } from './loading-bar/loading-bar.module';
import { HomeModule } from './home/home.module';
import { SearchAutocompleteModule } from './autocomplete/search-autocomplete.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		LoadingBarModule,
		HomeModule,
		RouterModule.forRoot(appRoutes),
		SearchAutocompleteModule,
	],
	bootstrap: [AppComponent]
})

export class AppModule {}
