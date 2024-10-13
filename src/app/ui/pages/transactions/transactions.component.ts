import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/transactions.service'; 
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { TransactionCardComponent } from '../../components/transaction-card/transaction-card.component';
import { UserDetailsComponent } from '../../components/user-details/user-details.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transactions',
  standalone: true, 
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  imports: [CommonModule, TransactionCardComponent, UserDetailsComponent] 
})

export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  userName: string = '';
  userBalance: number = 0;

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getAuthUser().subscribe({
      next: (user) => {
        this.userName = user?.name || '';
        this.userBalance = user?.balance || 0;
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      }
    });

    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data.reverse();
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }
}
