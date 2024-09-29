import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IRegisterForm} from "./register-form";
import {NgOptimizedImage} from "@angular/common";
import {FormButtonComponent} from "../form-button/form-button.component";
import {FormFieldComponent} from "../form-field/form-field.component";
import {CompanyLogoComponent} from "../company-logo/company-logo.component";
import {nameValidator, passwordMatchValidator, passwordValidator, usernameValidator} from "../validators";
import {AuthService} from "../auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    FormFieldComponent,
    FormButtonComponent,
    CompanyLogoComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup<IRegisterForm>(<IRegisterForm>{
    name: new FormControl('', [Validators.required, nameValidator()]),
    username: new FormControl('', [Validators.required, usernameValidator()]),
    password: new FormControl('', [Validators.required, passwordValidator()]),
    confirmPassword: new FormControl('', [Validators.required, passwordValidator()]),
  }, { validators: passwordMatchValidator() });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log("On click registration submit form")
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Form Data:', formData);
      try {
        this.authService.signUp(
            this.registerForm.value.username!,
            this.registerForm.value.password!,
            this.registerForm.value.name!
        )
            .then(() => console.log('Registration successful'))
            .catch(err => console.error('Registration failed', err));
        this.router.navigate(['/auth']).then(() => console.log('Navigated to auth'));
      } catch (error) {
        console.log('Sign up error', error)
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
