import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  user: any = {};

  constructor(private userService: UserService) { }

  login(): void {
    this.userService.loginUser(this.user).subscribe(response => {
      console.log('User logged in:', response);
    });
  }
}
