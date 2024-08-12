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
        this.successMessage = response.message;
        this.errorMessage = null;
        console.log('User registered', response);
        // Przekierowanie po rejestracji
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); // Przekierowanie po 2 sekundach
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.successMessage = null;
      }
    });
  }
}
