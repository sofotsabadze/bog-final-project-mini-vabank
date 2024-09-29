import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-krn',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage
  ],
  templateUrl: './krn.component.html',
  styleUrls: ['./krn.component.css']
})
export class KrnComponent {}