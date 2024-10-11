import {Component} from '@angular/core';
import { NgIf, NgOptimizedImage } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {AuthService} from "../../auth/auth-service";

@Component({
  selector: 'app-shell-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule,
    NgIf
  ],
  templateUrl: './shell-header.component.html',
  styleUrls: ['./shell-header.component.css']
})
export class ShellHeaderComponent {
  clientId: string | null = null;
  clientName: string = "";
  plusPoints: number = 0;
  logoSrc = 'assets/bank-horizontal-logo.png';
  searchQuery: any;

  constructor(private authService: AuthService) {
  }

  onLanguageChange() {
    console.log('Language change clicked');
  }

  onNotificationClick() {
    console.log('Notifications clicked');
  }

  onProfileClick() {
    console.log('Profile clicked');
  }

  toggleSearch() {
  }

  onSignOutClick() {
    this.authService.signOut();
  }
}