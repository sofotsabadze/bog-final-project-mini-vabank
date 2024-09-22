import { Component } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterOutlet
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
