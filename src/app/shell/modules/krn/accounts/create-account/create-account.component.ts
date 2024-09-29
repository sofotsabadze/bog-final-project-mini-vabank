import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  accountForm!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.accountForm = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  submitAccount() {
    if (this.accountForm.valid) {
      const accountData = this.accountForm.value;
      console.log('Account created:', accountData);
      this.router.navigate(['/krn/accounts']);
    } else {
      console.log('Invalid form');
    }
  }
}