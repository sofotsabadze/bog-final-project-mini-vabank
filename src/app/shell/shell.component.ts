import { Component } from '@angular/core';
import {ShellSidebarComponent} from "./shell-sidebar/shell-sidebar.component";
import {ShellHeaderComponent} from "./shell-header/shell-header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    ShellSidebarComponent,
    ShellHeaderComponent,
    RouterOutlet
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css'
})
export class ShellComponent {

}
