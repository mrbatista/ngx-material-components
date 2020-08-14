import { Component, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, Observable, Subject } from 'rxjs';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
	selector: 'mat-loading-bar',
  template: `
    <div class="mat-loading-bar-container">
      <ng-container *ngIf="showAlways || (active$ | async)">
        <mat-progress-bar [ngClass]="{ 'active': active$ | async }"
          [color]="color" [mode]="mode"></mat-progress-bar>
        <div class="mat-loading-bar-backdrop" *ngIf="backdrop && active$ | async" @fadeInOut></div>
      </ng-container>
    </div>
	`,
  styleUrls: ['./loading-bar.scss'],
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MatLoadingBarComponent implements OnDestroy {
	@Input() showAlways = false;
	@Input() backdrop = false;
	@Input() color = 'primary';

	active$ = new Subject<boolean>();
	mode: progressBarMode = 'determinate';
	subscription: Subscription;

	@Input()
	set loader(value: any) {
		const isObservable: boolean = value instanceof Observable;
		const isPromise: boolean = value instanceof Promise || (
			value !== null &&
			typeof value === 'object' &&
			typeof value.then === 'function' &&
			typeof value.catch === 'function'
		);

		if (isObservable) {
			this.initObservableHandler(value);
		} else if (isPromise) {
			this.initPromiseHandler(value);
		}
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	initLoadingState(): void {
		this.active$.next(true);
		this.mode = 'indeterminate';
	}

	cancelLoadingState(): void {
		this.active$.next(false);
		this.mode = 'determinate';
	}

	initPromiseHandler(promise: Promise<any>): void {
		const resolveLoadingState = () => this.cancelLoadingState();

		this.initLoadingState();

		promise
			.then(resolveLoadingState)
			.catch(resolveLoadingState);

	}

	initObservableHandler(observable: Observable<any>): void {
    this.initLoadingState();
		this.subscription = observable.subscribe({
			next: () => this.cancelLoadingState(),
			error: () => this.cancelLoadingState(),
			complete: () => {
				this.cancelLoadingState();
				this.subscription.unsubscribe();
			},
		});
	}
}

export declare type progressBarMode = 'indeterminate' | 'determinate';
