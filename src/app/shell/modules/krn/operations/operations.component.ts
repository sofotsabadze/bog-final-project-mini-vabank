import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [],
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent {
  constructor(private router: Router) {}

  navigateToPmd311() {
    this.router.navigate(['/pmd/pmd311']).then(r =>
    console.log("navigated to pmd311")
    );
  }
}