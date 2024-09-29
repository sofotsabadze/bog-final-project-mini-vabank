import {Component} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ILoginForm} from "./login-form";
import {CompanyLogoComponent} from "../company-logo/company-logo.component";
import {FormButtonComponent} from "../form-button/form-button.component";
import {FormFieldComponent} from "../form-field/form-field.component";
import {passwordValidator, usernameValidator} from "../validators";
import {AuthService} from "../auth-service";

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
    password: new FormControl('', [Validators.required, passwordValidator()])
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log("On click login submit form")
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Form Data:', formData);
      try {
        this.authService.signIn(this.loginForm.value.username!, this.loginForm.value.password!)
            .then(() => console.log('Login successful'))
            .catch(err => console.error('Login failed', err));
         this.router.navigate(['/bpm/bpm00']).then(() => console.log('Navigated to profile'));
      } catch (error) {
        console.log('Sign in error', error)
      }
    } else {
      console.log('Form is invalid');
    }
  }

}
