import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSearchAutocompleteModule } from "@mrbatista/mat-search-autocomplete";

import { DataService } from "./search-autcomplete.service";
import { SearchAutocompleteComponent } from "./search-autocomplete.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSearchAutocompleteModule,
  ],
  declarations: [SearchAutocompleteComponent],
  providers: [DataService],
})
export class SearchAutocompleteModule {}
