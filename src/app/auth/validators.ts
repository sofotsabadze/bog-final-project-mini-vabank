import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const errors: ValidationErrors = {};

    validateNoSpaces(value, errors);
    validateSymbolsMinSize(value, errors, 2);
    validateSymbolsMaxSize(value, errors, 30);
    return Object.keys(errors).length ? errors : null; // Return errors or null
  };
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const errors: ValidationErrors = {};

    validateNoSpaces(value, errors);
    validateSymbolsMinSize(value, errors, 2);
    validateSymbolsMaxSize(value, errors, 30);
    return Object.keys(errors).length ? errors : null; // Return errors or null
  };
}

function validateNoSpaces(value: string, errors: ValidationErrors) {
  if (value && /\s/.test(value)) {
    errors['noSpaces'] = 'სფეისები არ შეიძლება';
  }
}

function validateSymbolsMinSize(value: string, errors: ValidationErrors, minSize: number) {
  if (value && value.length < minSize) {
    errors['minLength'] = `გთხოვთ შეიყვანოთ მინიმუმ ${minSize} სიმბოლო`;
  }
}

function validateSymbolsMaxSize(value: string, errors: ValidationErrors, maxSize: number) {
  if (value && value.length > maxSize) {
    errors['maxLength'] = `აჭარბებს ${maxSize} სიმბოლოს`;
  }
}

