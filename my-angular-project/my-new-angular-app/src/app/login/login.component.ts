import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { username: '', password: '' };
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.successMessage = 'Pomyślnie zalogowano! Zaraz zostaniesz przeniesiony do ekranu początkowego.';
        this.errorMessage = null;
        console.log('Login successful', response);
        setTimeout(() => {
          this.router.navigate(['/']); 
        }, 2000); 
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.successMessage = null;
      },
    });
  }
}
