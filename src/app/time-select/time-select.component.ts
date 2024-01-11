import { Component } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { MatTimeSelectInputEvent } from "@mrbatista/mat-time-select";

@Component({
  selector: "app-time-select",
  templateUrl: "./time-select.component.html",
  styleUrls: ["./time-select.component.scss"],
})
export class TimeSelectComponent {
  inputDisabled: boolean;
  timeSelectDisabled: boolean;
  minTime: Date;
  maxTime: Date;
  startAt: Date;
  time: Date;
  lastTimeInput: Date | null;
  lastTimeChange: Date | null;
  color: ThemePalette;

  timeCtrl = new UntypedFormControl();

  onTimeInput = (e: MatTimeSelectInputEvent<Date>): Date =>
    (this.lastTimeInput = e.value);
  onTimeChange = (e: MatTimeSelectInputEvent<Date>): Date =>
    (this.lastTimeChange = e.value);
}
