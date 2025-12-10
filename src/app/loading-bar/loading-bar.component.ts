import { Component } from "@angular/core";
import { concat, Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

@Component({
  selector: "app-loading-bar",
  templateUrl: "./loading-bar.component.html",
  styleUrls: ["./loading-bar.component.scss"],
})
export class LoadingBarComponent {
  showAlways = true;
  backdrop: boolean;
  color = "primary";
  loader: Promise<unknown> | Observable<unknown>;
  isLoading: Observable<boolean>;

  promise(): void {
    this.loader = new Promise((resolve) =>
      setTimeout(() => resolve(void 0), 2000),
    );
  }

  shortLiveObservable(): void {
    this.loader = of("string").pipe(delay(2000));
  }

  longLiveObservable(): void {
    this.isLoading = concat(of(true), of(false).pipe(delay(2000)));
  }
}
