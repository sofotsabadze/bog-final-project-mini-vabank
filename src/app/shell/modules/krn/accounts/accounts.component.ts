import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { NgForOf } from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {FirebaseService} from "../../../../firebase-service";

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  clientId: string | null = null;
  accountsList: any[] = [];
  totalAmount: number = 0;
  @Output() totalAmountCalculated: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private firebaseService: FirebaseService) {
    this.route.queryParamMap.subscribe(params => {
      this.clientId = params.get('clientId');
    });
  }

  ngOnInit() {
    this.firebaseService.fetchAccountsByClientId(this.clientId!).then((data) => {
      this.accountsList = data ? Object.values(data) : [];
      this.totalAmount = this.accountsList.reduce((total, account) => {
        return total + (parseFloat(account.accountAmount) || 0);
      }, 0);
      console.log("amount:", this.totalAmount);
      this.totalAmountCalculated.emit(this.totalAmount);
    }).catch((error) => {
      console.error('Error fetching clients data:', error);
    });
  }

  deleteAccount(account: any) {
    console.log('Delete clicked for:', account);
  }

  addNewAccount() {
    this.router.navigate(['/krn/accounts/create'], {queryParamsHandling: 'preserve'});
  }
}