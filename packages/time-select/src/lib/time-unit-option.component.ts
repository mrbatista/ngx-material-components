import { coerceBooleanProperty } from "@angular/cdk/coercion";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { mixinDisableRipple } from "@angular/material/core";

export class MatTimeUnitOptionBase {}
// eslint-disable-next-line no-underscore-dangle
export const _MatTimeUnitOptionMixinBase: typeof MatTimeUnitOptionBase =
  mixinDisableRipple(MatTimeUnitOptionBase);

/** Single time option inside a `<mat-time-unit-select>` element */
@Component({
  selector: "mat-time-unit-option",
  templateUrl: "./time-unit-option.component.html",
  styleUrls: ["./time-unit-option.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatTimeUnitOptionComponent<D> extends _MatTimeUnitOptionMixinBase {
  private _disabled = false;
  private _selected = false;

  /** The value of the option. */
  @Input() value: D;
  /** Whether ripples for the option are disabled. */
  @Input() disableRipple: boolean;

  /** The element containing the display text of the option. */
  @ViewChild("text", { static: true }) _text: ElementRef<HTMLElement>;

  /** @docs-private */
  @HostBinding("class") readonly class = "mat-time-unit-option";
  /** @docs-private */
  @HostBinding("attr.role") readonly role = "option";
  /** @docs-private */
  @HostBinding("attr.tabindex") readonly tabindex = -1;

  /** Whether or not the option is currently selected. */
  @Input()
  @HostBinding("class.mat-time-unit-option-selected")
  get selected(): boolean {
    return this._selected;
  }
  set selected(value: boolean) {
    const selected = coerceBooleanProperty(value);
    if (this._selected !== selected) {
      this._selected = selected;
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Whether the option is disabled. */
  @Input()
  @HostBinding("class.mat-time-unit-option-disabled")
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    const disabled = coerceBooleanProperty(value);
    if (this._disabled !== disabled) {
      this._disabled = disabled;
      this._changeDetectorRef.markForCheck();
    }
  }

  /** @docs-private */
  @HostBinding("attr.aria-disabled")
  get ariaDisabled(): string {
    return this.disabled.toString();
  }

  @Output() readonly selectedChange: EventEmitter<D> = new EventEmitter<D>();

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
  }

  /** Gets the label to be used when determining whether the option should be focused. */
  getLabel(): string {
    return this._text
      ? (this._text.nativeElement.textContent || "").trim()
      : "";
  }

  /** Gets the host DOM element. */
  _getHostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  /** Whether ripples for the option are disabled. */
  _isRippleDisabled(): boolean {
    return this.disabled || this.disableRipple;
  }

  /** Handle click on the option. */
  @HostListener("click")
  _onClick(): void {
    if (!this.disabled) {
      this.selectedChange.emit(this.value);
    }
  }
}
