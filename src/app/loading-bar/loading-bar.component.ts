import { Component } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
	selector: 'app-loading-bar',
	templateUrl: './loading-bar.component.html',
	styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent {

	showAlways = true;
	backdrop: boolean;
	color = 'primary';
	loader: Promise<any> | Observable<any>;

	promise() {
		this.loader = new Promise(resolve => setTimeout(() => resolve(), 2000));
	}

	observable() {
		this.loader = of('string').pipe(delay(2000));
	}

}
