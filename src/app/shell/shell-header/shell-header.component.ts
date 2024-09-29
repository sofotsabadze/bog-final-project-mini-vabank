import { Component } from '@angular/core';
import { NgIf, NgOptimizedImage } from "@angular/common";
import { FormsModule } from "@angular/forms";

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
  logoSrc = 'assets/bank-horizontal-logo.png';
  searchQuery: any;
  showSearch: boolean = true;

  onSearch() {
  }

  onLanguageChange() {
  }

  onNotificationClick() {
  }

  onProfileClick() {
  }

  toggleSearch() {
  }
}