import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../../../services/transactions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-transaction',
  standalone: true,
  templateUrl: './send-transaction.component.html',
  styleUrls: ['./send-transaction.component.css'],
  imports: [FormsModule, CommonModule], 
})

export class SendTransactionComponent {
  to: string = '';
  amount: number | null = null;
  message: string = '';

  constructor(
    private transactionService: TransactionService,
    private router: Router) {}

  sendTransaction() {
    if (this.to && this.amount) {
      const transactionData = {
        to: this.to,
        amount: this.amount
      };

      this.transactionService.sendTransaction(transactionData).subscribe(
        () => {
           this.router.navigate(["transactions"])
        },
        (error) => {
          this.message = 'Error sending transaction: ' + error.message;
        }
      );
    } else {
      this.message = 'Please fill in all fields.';
    }
  }
}
