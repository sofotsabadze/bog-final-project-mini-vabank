import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const errors: ValidationErrors = {};

        validateSymbolsMinSize(value, errors, 2);
        validateSymbolsMaxSize(value, errors, 30);
        return Object.keys(errors).length ? errors : null;
    };
}

export function usernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const errors: ValidationErrors = {};

        validateNoSpaces(value, errors);
        validateSymbolsMinSize(value, errors, 2);
        validateSymbolsMaxSize(value, errors, 30);
        return Object.keys(errors).length ? errors : null;
    };
}

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const errors: ValidationErrors = {};

        validateNoSpaces(value, errors);
        validateSymbolsMinSize(value, errors, 6);
        validateSymbolsMaxSize(value, errors, 30);
        return Object.keys(errors).length ? errors : null; // Return errors or null
    };
}

export function passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const errors: ValidationErrors = {};
        const formGroup = control as FormGroup;
        const password = formGroup.get('password')?.value;
        const confirmPassword = formGroup.get('confirmPassword')?.value;

        validatePasswordMatch(password, confirmPassword, errors);
        return Object.keys(errors).length ? errors : null;
    };
}

export function registerFirstNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const errors: ValidationErrors = {};

        validateNoSpaces(value, errors);
        validateSymbolsMinSize(value, errors, 2);
        validateSymbolsMaxSize(value, errors, 30);
        return Object.keys(errors).length ? errors : null;
    };
}

export function registerLastNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const errors: ValidationErrors = {};

        validateNoSpaces(value, errors);
        validateSymbolsMinSize(value, errors, 2);
        validateSymbolsMaxSize(value, errors, 30);
        return Object.keys(errors).length ? errors : null;
    };
}

export function registerPlusPointsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const errors: ValidationErrors = {};

        validateNumberMinValue(value, errors, 0);
        return Object.keys(errors).length ? errors : null;
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

function validateNumberMinValue(value: number, errors: ValidationErrors, minValue: number) {
    if (value < minValue) {
        errors['minValue'] = `გთხოვთ შეიყვანოთ მინიმუმ ${minValue}`;
    }
}

function validatePasswordMatch(password: string, confirmPassword: string, errors: ValidationErrors) {
    if (password !== confirmPassword) {
        console.log(`პაროლები არ ემთხვევა`);
        errors['passwordNotMatch'] = `პაროლები არ ემთხვევა`;
        errors['match'] = `პაროლები არ ემთხვევა`;
    }
}
