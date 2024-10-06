import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, MinValidator, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {
  registerFirstNameValidator,
  registerLastNameValidator,
  registerPlusPointsValidator
} from "../../../../auth/validators";
import {IRegisterForm} from "./register-form";
import {FirebaseService} from "../../../../firebase-service";
import {FormButtonComponent} from "../../../../auth/form-button/form-button.component";
import {FormFieldComponent} from "../../../../auth/form-field/form-field.component";

@Component({
  selector: 'app-bpm01',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormButtonComponent,
    FormFieldComponent
  ],
  templateUrl: './bpm01.component.html',
  styleUrl: './bpm01.component.css'
})
export class Bpm01Component {
  registrationForm: FormGroup<IRegisterForm>;

  constructor(private firebaseService: FirebaseService, private router: Router) {
    this.registrationForm = new FormGroup<IRegisterForm>({
      firstName: new FormControl<string | null>('', [Validators.required, registerFirstNameValidator()]),
      lastName: new FormControl<string | null>('', [Validators.required, registerLastNameValidator()]),
      plusPoints: new FormControl<number | null>(null, [Validators.required, registerPlusPointsValidator()])
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      console.log('Form Data:', formData);
      this.firebaseService.addClient(formData);
      this.router.navigate(['/bpm/bpm00']).then(() =>
          console.log("Navigate to client list")
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
