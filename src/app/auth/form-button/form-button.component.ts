import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-form-button',
  standalone: true,
  imports: [],
  templateUrl: './form-button.component.html',
  styleUrl: './form-button.component.css'
})
export class FormButtonComponent {
  @Input() href: string = '';
  @Input() disabled: boolean = true;
  @Input() submitText: string = '';
  @Input() hrefText: string = '';
  @Input() iconClass: string = 'fas';
  @Input() errorMessage: string = '';

}
