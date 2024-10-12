import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';  
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false; 
  private apiUrl = 'http://localhost:3001/api/auth/';

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {

  } 

  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }

  signIn(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}signin`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  signUp(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}signup`, userData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  handleSignIn(token: string) {  
    this.loggedIn = true;
    this.cookieService.set('token', token, 1);
    this.router.navigate(['/transactions']); 
  }

  signOut() {
    this.loggedIn = false;
    this.cookieService.delete('token');
    this.router.navigate(['/signin']);
  }
}
