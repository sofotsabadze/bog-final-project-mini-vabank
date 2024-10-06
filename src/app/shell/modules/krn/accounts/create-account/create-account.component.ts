import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgIf } from "@angular/common";
import {FormFieldComponent} from "../../../../../auth/form-field/form-field.component";
import {
  nameValidator,
  registerPlusPointsValidator
} from "../../../../../auth/validators";
import {ICreateAccountForm} from "./create-account-form";
import {FirebaseService} from "../../../../../firebase-service";

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    FormFieldComponent
  ],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  createAccountForm: FormGroup<ICreateAccountForm>;
  clientId: string | null = null;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private firebaseService: FirebaseService) {
    this.createAccountForm = new FormGroup<ICreateAccountForm>({
      accountName: new FormControl<string | null>('', [Validators.required, nameValidator()]),
      accountAmount: new FormControl<number | null>(null, [Validators.required, registerPlusPointsValidator()])
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.clientId = params.get('clientId');
    });
  }

  submitAccount() {
    if (this.createAccountForm.valid) {
      const accountData = this.createAccountForm.value;
      console.log('Account created:', accountData);
      this.router.navigate(['/krn/accounts']);
    } else {
      console.log('Invalid form');
    }
  }

  onSubmit() {
    if (this.createAccountForm.valid) {
      const newAccount = this.createAccountForm.value;
      console.log('Account created:', newAccount);
      this.firebaseService.addAccount(this.clientId!, newAccount.accountName!, newAccount.accountAmount!)
          .then(() => {
            console.log('Account created successfully');
            this.router.navigate(['/krn/accounts'], { queryParamsHandling: 'preserve' });
          })
          .catch((error: any) => {
            console.error('Error creating new account:', error);
          });
      this.router.navigate(['/krn/accounts'], { queryParamsHandling: 'preserve' });
    } else {
      console.log('Invalid form');
    }
  }

}