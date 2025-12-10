import { animate, style, transition, trigger } from "@angular/animations";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: "mat-loading-bar",
  template: `
    <div class="mat-loading-bar-container">
      <ng-container *ngIf="showAlways || (active$ | async)">
        <mat-progress-bar
          [ngClass]="{ active: active$ | async }"
          [color]="color"
          [mode]="mode"
        ></mat-progress-bar>
        <div
          class="mat-loading-bar-backdrop"
          *ngIf="backdrop && active$ | async"
          @fadeInOut
        ></div>
      </ng-container>
    </div>
  `,
  styleUrls: ["./loading-bar.scss"],
  animations: [
    trigger("fadeInOut", [
      transition("void => *", [
        style({
          opacity: 0,
        }),
        animate(".3s ease"),
      ]),
      transition("* => void", [
        animate(
          ".3s ease",
          style({
            opacity: 0,
          }),
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatLoadingBarComponent implements OnDestroy {
  @Input() showAlways = false;
  @Input() backdrop = false;
  @Input() color = "primary";

  active$ = new BehaviorSubject<boolean>(false);
  mode: progressBarMode = "determinate";
  subscription: Subscription;

  @Input()
  set loader(value: Observable<unknown> | Promise<unknown>) {
    const isObservable: boolean = value instanceof Observable;
    const isPromise: boolean = value instanceof Promise;

    if (isObservable) {
      this.initObservableHandler(value as Observable<unknown>);
    } else if (isPromise) {
      this.initPromiseHandler(value as Promise<unknown>);
    }
  }

  @Input()
  set isLoading(value: Observable<boolean>) {
    if (value instanceof Observable) {
      this.initLoadingStatusObservable(value);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initLoadingState(): void {
    this.active$.next(true);
    this.mode = "indeterminate";
  }

  cancelLoadingState(): void {
    this.active$.next(false);
    this.mode = "determinate";
  }

  initPromiseHandler(promise: Promise<unknown>): void {
    const resolveLoadingState = () => this.cancelLoadingState();

    this.initLoadingState();

    promise.then(resolveLoadingState).catch(resolveLoadingState);
  }

  initObservableHandler(observable: Observable<unknown>): void {
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

  initLoadingStatusObservable(observable: Observable<boolean>): void {
    this.subscription = observable
      .pipe(tap((value) => console.log(value)))
      .subscribe({
        next: (isLoading) =>
          isLoading ? this.initLoadingState() : this.cancelLoadingState(),
        error: () => this.cancelLoadingState(),
      });
  }
}

export declare type progressBarMode = "indeterminate" | "determinate";
