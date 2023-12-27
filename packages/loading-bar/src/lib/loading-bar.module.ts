import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatLegacyProgressBarModule as MatProgressBarModule } from "@angular/material/legacy-progress-bar";

import { MatLoadingBarComponent } from "./loading-bar.component";

@NgModule({
  imports: [CommonModule, MatProgressBarModule],
  declarations: [MatLoadingBarComponent],
  exports: [MatLoadingBarComponent],
})
export class MatLoadingBarModule {}
