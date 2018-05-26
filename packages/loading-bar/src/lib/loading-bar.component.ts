import { Component, Input, OnDestroy, OnInit, HostBinding } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
	selector: 'mat-loading-bar',
	template: `
    <ng-container *ngIf="showAlways || active">
			<mat-progress-bar [ngClass]="{ 'active': active, 'fixed': fixed }"
				[color]="color" [mode]="mode"></mat-progress-bar>
			<div class="mat-loading-backdrop" *ngIf="includeBackdrop && active" @fadeInOut></div>
		</ng-container>
	`,
	styleUrls: ['./loading-bar.sass'],
	animations: [
		trigger('fadeInOut', [
			transition('void => *', [
				style({
					opacity: 0,
				}),
				animate('.3s ease')
			]),
			transition('* => void', [
				animate('.3s ease', style({
					opacity: 0,
				}))
			])
		])
	]
})

export class MatLoadingBarComponent {
	@Input() fixed = false;
	@Input() showAlways = true;
	@Input() includeBackdrop = false;
	@Input() color;

	active: boolean;
	mode: progressBarMode = 'determinate';
	promise: any;

	@Input()
	set loader(value: any) {
		const isObservable: boolean = value instanceof Observable;
		const isSubscription: boolean = value instanceof Subscription;
		const isPromise: boolean = value instanceof Promise || (
			value !== null &&
			typeof value === 'object' &&
			typeof value.then === 'function' &&
			typeof value.catch === 'function'
		);

		if (isObservable) {
			throw new TypeError('loader must be an instance of Subscription, instance of Observable given');
		} else if (isSubscription) {
			this.promise = new Promise((resolve) => {
				(value as Subscription).add(resolve);
			});
		} else if (isPromise) {
			this.promise = value;
		}

		if (this.promise) {
			this.initPromiseHandler();
		}
	}

	initLoadingState(): void {
		this.active = true;
		this.mode = 'indeterminate';
	}

	cancelLoadingStateIfPromiseDone(): void {
		this.active = false;
		this.mode = 'determinate';
	}

	initPromiseHandler() {
		const promise = this.promise;

		const resolveLoadingState = () => this.cancelLoadingStateIfPromiseDone();

		this.initLoadingState();

		// native Promise doesn't have finally
		if (promise.finally) {
			promise.finally(resolveLoadingState);
		} else {
			promise
				.then(resolveLoadingState)
				.catch(resolveLoadingState);
		}

	}
}

export declare type progressBarMode = 'indeterminate' | 'determinate';
