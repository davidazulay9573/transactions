import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: true, 
  imports: [FormsModule], 
})

export class SigninComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {} 

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    this.authService.signIn({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Response from server:', response);
        this.authService.handleSignIn(response.token);
      },
      error: (error) => {
        alert('Error during sign-in:' + error.message);
      },
    });
  }
}
