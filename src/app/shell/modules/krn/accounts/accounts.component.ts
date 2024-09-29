import { Component } from '@angular/core';
import { NgForOf } from "@angular/common";
import { Router } from "@angular/router";

interface AccountData {
  name: string;
  accountName: string;
  amount: number;
}

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  accountList: AccountData[] = [
    { name: 'Test 1', accountName: 'Test Account', amount: 100 },
    { name: 'Test 2', accountName: 'Test Account', amount: 200 },
    { name: 'Test 3', accountName: 'Test Account', amount: 300 },
    { name: 'Test 4', accountName: 'Test Account', amount: 400 }
  ];

  constructor(private router: Router) {}

  deleteAccount(account: AccountData) {
    console.log('Delete clicked for:', account);
  }

  addNewAccount() {
    console.log('Add account clicked');
    this.router.navigate(['/krn/accounts/create']);
  }
}