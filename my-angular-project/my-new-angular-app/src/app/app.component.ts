import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-auth0-app';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.handleAuthCallback();  // Obsługa callbacka po zalogowaniu
  }
}
