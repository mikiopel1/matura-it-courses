import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {};

  constructor(private userService: UserService) {}

  register() {
    this.userService.register(this.user).subscribe(
      response => {
        console.log('User registered successfully', response);
      },
      error => {
        console.error('Error registering user', error);
      }
    );
  }
}
