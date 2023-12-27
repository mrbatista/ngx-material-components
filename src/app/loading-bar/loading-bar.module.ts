import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyCheckboxModule as MatCheckboxModule } from "@angular/material/legacy-checkbox";
import { MatLegacyRadioModule as MatRadioModule } from "@angular/material/legacy-radio";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatLoadingBarModule } from "@mrbatista/mat-loading-bar";

import { LoadingBarComponent } from "./loading-bar.component";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,
    MatLoadingBarModule,
  ],
  declarations: [LoadingBarComponent],
})
export class LoadingBarModule {}
