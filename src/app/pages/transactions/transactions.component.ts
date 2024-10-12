import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})

export class TransactionComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
