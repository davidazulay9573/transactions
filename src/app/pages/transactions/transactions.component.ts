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
  constructor(
    private authService: AuthService, 
    private router: Router,
    private cookieService: CookieService 
  ) {}

  ngOnInit(): void {
    // this.autoSignIn();
  }

  autoSignIn() {
    const email = this.cookieService.get('email');
    const password = this.cookieService.get('password');

    if (email && password) {
      this.authService.signIn({ email, password }).subscribe({
        next: (response) => {
          console.log('Auto sign-in successful:', response);
          this.authService.handleSignIn(response.token);
        },
        error: (error) => {
          console.error('Auto sign-in error:', error);
          this.cookieService.delete('email');
          this.cookieService.delete('password');
          this.router.navigate(["sign-in"])
        },
      });
    } else {
      console.log('No credentials found in cookies.');
      this.router.navigate(["sign-in"])
    }
  }
}
