import { Routes } from '@angular/router';

import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'loading-bar', component: LoadingBarComponent },
	{ path: '' , redirectTo: '/home', pathMatch: 'full' },
	// { path: '**', component: PageNotFoundComponent }
];
