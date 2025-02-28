import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";

import { HomeComponent } from "./home.component";

@NgModule({
  imports: [CommonModule, FormsModule, MatButtonModule, RouterModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
