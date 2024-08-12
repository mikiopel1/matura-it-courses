import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-new-angular-app';
  videoUrl = 'http://path/to/your/video.mp4';

  constructor(private router: Router) {}

  isLoginOrRegisterPage(): boolean {
    return this.router.url === '/register' || this.router.url === '/login';
  }
}
