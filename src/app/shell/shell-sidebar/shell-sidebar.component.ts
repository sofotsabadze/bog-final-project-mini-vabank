import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shell-sidebar',
  standalone: true,
  templateUrl: './shell-sidebar.component.html',
  styleUrls: ['./shell-sidebar.component.css']
})
export class ShellSidebarComponent {
  @Input() username: string = 'Test Tester';
  @Input() status: string = 'TEST';
  @Input() profileImageUrl: string = 'assets/avatar.jpeg';
  @Input() backgroundImageUrl: string = 'assets/background.jfif';
}