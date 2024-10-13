import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';  
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }

  signIn(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signin`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  signUp(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, userData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  getAuthUser(): Observable<any> {
    const token = this.cookieService.get("token");

    if (token) {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.id;
        const headers = new HttpHeaders().set('x-auth-token', token);

        return this.http.get<any>(`${this.apiUrl}/users/${userId}`, { headers });
    }

    return new Observable((observer) => {
        observer.error('No token found');
        observer.complete();
    });
}


  handleSignIn(token: string) {  
    this.cookieService.set('token', token, 1);
    this.router.navigate(['/transactions']); 
  }

  signOut() {
    this.cookieService.delete('token');
    this.router.navigate(['/signin']);
  }

  getToken() {
    return this.cookieService.get("token");
  }
}
