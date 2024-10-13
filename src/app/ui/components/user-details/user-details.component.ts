import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-details',
  standalone: true,
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  @Input() userName: string = '';
  @Input() userBalance: number = 0;
}
