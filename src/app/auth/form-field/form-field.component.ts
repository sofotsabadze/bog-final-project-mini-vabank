import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  AbstractControl,
  ReactiveFormsModule,
  FormControl
} from '@angular/forms';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-form-field',
  standalone: true,
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true
    }
  ]
})
export class FormFieldComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() fieldId: string = '';
  @Input() control!: FormControl; // Use AbstractControl
  @Input() iconClass: string = 'fas';
  @Input() errorMessage: string = '';

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    if (this.control) {
      this.control.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
