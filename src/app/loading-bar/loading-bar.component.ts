import { Component, OnInit, Input } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
	selector: 'app-loading-bar',
	templateUrl: './loading-bar.component.html',
	styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent {

	@Input() showAlways = true;
	@Input() backdrop: boolean;
	@Input() color = 'primary';
	@Input() loader: any;
	@Input() fixed: boolean;

	promise() {
		this.loader = new Promise(resolve => setTimeout(() => resolve(), 2000));
	}

	subscription() {
		this.loader = of('string').pipe(delay(2000)).subscribe();
	}

}
