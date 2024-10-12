import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule],
  
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';

  constructor(private authService: AuthService, private cookieService: CookieService) {}

  onSubmit() {
    const userData = { name: this.name, email: this.email, password: this.password, phone: this.phone };
    console.log(userData);
    
    this.authService.signUp(userData).subscribe({
      next: (response) => {
        console.log('Sign Up Successful:', response);

        this.cookieService.set('email', this.email, 1); 
        this.cookieService.set('password', this.password, 1); 

        alert("Check your email address and click on the link!");
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
