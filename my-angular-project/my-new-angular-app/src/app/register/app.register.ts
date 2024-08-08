import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  register(): void {
    const user = { username: this.username, password: this.password };
    this.authService.register(user).subscribe(
      response => {
        console.log('User registered:', response);
      },
      error => {
        console.error('Registration error:', error);
      }
    );
  }
}
