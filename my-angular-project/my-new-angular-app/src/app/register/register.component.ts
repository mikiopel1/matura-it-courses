import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(user).subscribe({
      next: (response) => {
        this.successMessage = "Registration successful! Redirecting to login...";
        this.errorMessage = null;
        console.log('User registered', response);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Registration error details:', err); // Logowanie pełnego błędu

        const errorMessage = err?.error?.message || ''; // Bezpieczne sprawdzanie, czy err.error.message istnieje

        if (errorMessage.includes("Username already in use")) {
          this.errorMessage = "Username is already taken. Please choose another one.";
        } else if (errorMessage.includes("Email already in use")) {
          this.errorMessage = "Email is already in use. Please use a different email.";
        } else {
          this.errorMessage = "An unexpected error occurred. Please try again later.";
        }
        this.successMessage = null;
      }
    });
  }
}
