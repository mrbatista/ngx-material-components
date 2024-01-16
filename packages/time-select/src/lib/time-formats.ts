import { InjectionToken } from "@angular/core";

export interface MatTimeFormats {
  parse: {
    timeInput: unknown;
  };
  display: {
    timeInput: unknown;
    timeA11yLabel: unknown;
  };
}

export const MAT_TIME_FORMATS = new InjectionToken<MatTimeFormats>(
  "mat-time-formats",
);
