import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = ''; // Dodane pole email
  password: string = '';

  constructor(private authService: AuthService) {}

  register() {
    const user = {
      username: this.username,
      email: this.email, // Przekazanie emaila
      password: this.password
    };

    this.authService.register(user).subscribe({
      next: (response) => {
        console.log('User registered', response);
      },
      error: (err) => {
        console.error('Registration error', err);
        alert(err.error); // Wyświetla wiadomość o błędzie (np. "Username or email already in use")
      }
    });
  }
}
