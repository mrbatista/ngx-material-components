import { Injectable } from "@angular/core";
import { SearchAutocompleteService } from "@mrbatista/mat-search-autocomplete";
import { Observable } from "rxjs/internal/Observable";
import { Subscriber } from "rxjs/internal/Subscriber";
import { map } from "rxjs/operators";

export interface Item {
  name: string;
  code: string;
}

@Injectable()
export class DataService implements SearchAutocompleteService {
  items = [
    { name: "Afghanistan", code: "AF" },
    { name: "Land Islands", code: "AX" },
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "American Samoa", code: "AS" },
    { name: "Andorra", code: "AD" },
    { name: "Angola", code: "AO" },
    { name: "Anguilla", code: "AI" },
    { name: "Antarctica", code: "AQ" },
    { name: "Antigua and Barbuda", code: "AG" },
  ];
  fetch(value?: string, _defaultFilter?: unknown): Observable<Array<Item>> {
    return new Observable<Item[]>((subscriber: Subscriber<Item[]>) => {
      setTimeout(() => {
        subscriber.next(this.items);
      }, 2000);
    }).pipe(
      map((values) =>
        value
          ? values.filter((v) =>
              v.name.toLowerCase().includes(value.toLowerCase()),
            )
          : values,
      ),
    );
  }
}
