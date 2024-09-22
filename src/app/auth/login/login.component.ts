import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ILoginForm} from "./login-form";
import {CompanyLogoComponent} from "../company-logo/company-logo.component";
import {FormButtonComponent} from "../form-button/form-button.component";
import {FormFieldComponent} from "../form-field/form-field.component";
import {usernameValidator} from "../validators";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    RouterOutlet,
    FormFieldComponent,
    ReactiveFormsModule,
    FormButtonComponent,
    CompanyLogoComponent
  ],
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup<ILoginForm>({
    username: new FormControl('', [Validators.required, usernameValidator()]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit() {

  }

}
