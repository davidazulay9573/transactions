import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for NgIf
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  signupSuccess: boolean = false;
  emailLink: string = '';

  constructor(private authService: AuthService, private cookieService: CookieService) {}

  onSubmit() {
    const userData = { name: this.name, email: this.email, password: this.password, phone: this.phone };

    this.authService.signUp(userData).subscribe({
      next: (response) => {
        console.log('Sign Up Successful:', response);

        this.cookieService.set('email', this.email, 1);
        this.cookieService.set('password', this.password, 1);

        this.signupSuccess = true;
        this.emailLink = `mailto:${this.email}`;
      },
      error: (error) => {
        alert('Sign-up error: ' + error.message);
      },
    });
  }

  getCookieValue() {
    const email = this.cookieService.get('email');
    console.log('Email from cookie:', email);
  }
}
