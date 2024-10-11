import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {FirebaseService} from "../../../../firebase-service";

@Component({
  selector: 'app-pmd311',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './pmd311.component.html',
  styleUrls: ['./pmd311.component.css']
})
export class Pmd311Component implements OnInit {
  transferForm: FormGroup = new FormGroup({});

  senderAccounts: any[] = [];
  recipientAccounts: any[] = [];
  currentClientId: string | null = null;

  constructor(private firebaseService: FirebaseService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('Initializing Transfer Form');
    this.transferForm = new FormGroup({
      senderAccount: new FormControl('', Validators.required),
      recipientAccount: new FormControl('', Validators.required),
      transferAmount: new FormControl('', [Validators.required, Validators.min(1)])
    });

    this.route.queryParamMap.subscribe(params => {
      this.currentClientId = params.get('clientId');
      this.loadAccounts();
    });
  }

  private fetchSenderAccounts(clientId: string): void {
    console.log('Fetching sender accounts');
    this.firebaseService.fetchAllAccountsExcept(clientId).then(accounts => {
      this.senderAccounts = accounts;
    }).catch(error => {
      console.error('Error fetching sender accounts:', error);
    });
  }

  private fetchRecipientAccounts(clientId: string): void {
    this.firebaseService.fetchAllAccountsExcept(clientId).then(accounts => {
      this.recipientAccounts = accounts;
    }).catch(error => {
      console.error('Error fetching recipient accounts:', error);
    });
  }

  onTransferSubmit() {
    if (this.transferForm.valid) {
      console.log(this.transferForm)
      const transferDetails = this.transferForm.value;
      console.log(this.senderAccounts);
      console.log(transferDetails.senderAccount);
      const selectedSenderAccount = this.senderAccounts.find(account => account.accountId === transferDetails.senderAccount);
      const selectedRecipientAccount = this.recipientAccounts.find(account => account.accountId === transferDetails.recipientAccount);

      const amountToTransfer = transferDetails.transferAmount;

      this.firebaseService.transferFunds(selectedSenderAccount, selectedRecipientAccount, amountToTransfer)
          .then(() => {
            console.log('Funds transfer successful');
            this.transferForm.reset();
            this.loadAccounts();
          })
          .catch(error => {
            console.error('Funds transfer failed:', error);
          });
    } else {
      console.log('Invalid transfer form');
    }
  }

  private loadAccounts(): void {
    console.log('Loading accounts for clientId:', this.currentClientId);
    if (this.currentClientId) {
      this.fetchSenderAccounts(this.currentClientId);
      this.fetchRecipientAccounts(this.currentClientId);
    }
  }
}