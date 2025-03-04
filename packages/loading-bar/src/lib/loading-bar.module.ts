import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { MatLoadingBarComponent } from "./loading-bar.component";

@NgModule({
  imports: [CommonModule, MatProgressBarModule],
  declarations: [MatLoadingBarComponent],
  exports: [MatLoadingBarComponent],
})
export class MatLoadingBarModule {}
