import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Poprawny import AuthService

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public authService: AuthService) {}  // Wstrzyknięcie AuthService

  logout(): void {
    this.authService.logout();  // Metoda wylogowania
  }
}
