import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:3001/api/transactions';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getTransactions(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('x-auth-token', token);

    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  
  sendTransaction(transactionData: { to: string; amount: number }): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('x-auth-token', token);

    return this.http.post(this.apiUrl, transactionData, { headers });
    
  }
}