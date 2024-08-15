import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private auth: AuthService) {}

  register(): void {
    // Implement registration logic here
    // For now, this can simply call a register method in the AuthService
    this.auth.register();
  }
}
