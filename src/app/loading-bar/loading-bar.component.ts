import { Component } from "@angular/core";
import { Observable, of } from "rxjs";
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

  promise(): void {
    this.loader = new Promise((resolve) =>
      setTimeout(() => resolve(void 0), 2000),
    );
  }

  observable(): void {
    this.loader = of("string").pipe(delay(2000));
  }
}
