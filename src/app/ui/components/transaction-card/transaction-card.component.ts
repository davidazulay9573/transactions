import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-card',
  standalone: true, 
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.css'],
})
export class TransactionCardComponent {
  @Input() transaction: any;
}
