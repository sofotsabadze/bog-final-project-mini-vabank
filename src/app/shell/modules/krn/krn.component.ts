import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {FirebaseService} from "../../../firebase-service";
import {AccountsComponent} from "./accounts/accounts.component";

@Component({
  selector: 'app-krn',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    AccountsComponent
  ],
  templateUrl: './krn.component.html',
  styleUrls: ['./krn.component.css']
})
export class KrnComponent implements OnInit {
  clientId: string | null = null;
  clientName: string = "";
  plusPoints: number = 0;
  totalAmount: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private firebaseService: FirebaseService) {}

  onTotalAmountReceived(total: number) {
    this.totalAmount = total;
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.clientId = params.get('clientId');
      const storedClientData = localStorage.getItem('clientData');
      if (storedClientData) {
        const clientData = JSON.parse(storedClientData);
        if (clientData.clientId == this.clientId) {
          this.clientName = clientData.clientName;
          this.plusPoints = clientData.plusPoints;
        } else {
          this.getClientDataService()
        }
      } else {
        this.getClientDataService();
      }
    });
  }

  getClientDataService() {
    this.firebaseService.fetchClient(this.clientId ?? "").then(document => {
      this.clientName = document?.['firstName'] + ' ' + document?.['lastName'];
      this.plusPoints = document?.['plusPoints'];
      localStorage.setItem('clientData', JSON.stringify({
        clientId: this.clientId,
        clientName: this.clientName,
        plusPoints: this.plusPoints
      }));
    });
  }

  navigateWithPreserve(route: string) {
    this.router.navigate([route], {queryParamsHandling: 'preserve'});
  }

  onExitFromProfile() {
    this.router.navigate(["/bpm/bpm00"]);
  }
}