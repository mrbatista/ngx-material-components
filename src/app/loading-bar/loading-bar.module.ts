import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatLoadingBarModule } from "@mrbatista/mat-loading-bar";

import { LoadingBarComponent } from "./loading-bar.component";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,
    MatLoadingBarModule,
  ],
  declarations: [LoadingBarComponent],
})
export class LoadingBarModule {}
