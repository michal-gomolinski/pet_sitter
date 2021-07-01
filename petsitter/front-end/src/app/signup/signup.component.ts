import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(public userService: UserService) {}

  user: any;
  token: any;
  ngOnInit(): void {
    this.user = {
      username: '',
      password: '',
    };
    this.token = this.userService.getToken();
  }
  login() {
    this.userService.register({
      username: this.user.username,
      password: this.user.password,
    });
  }

  refreshToken() {
    this.userService.refreshToken();
  }

  logout() {
    this.userService.logout();
  }
}
