import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(public userService: UserService) {}

  user: any;
  token: any;
  name: any;
  error = '';
  ngOnInit(): void {
    this.user = {
      username: '',
      password: '',
    };
    this.token = this.userService.getToken();
    this.name = sessionStorage.getItem('username');
  }
  login() {
    this.error = '';
    this.userService.login({
      username: this.user.username,
      password: this.user.password,
    });
    this.token = this.userService.getToken();
    console.log(this.userService.errors);
    this.error = this.userService.errors;
    //
  }

  refreshToken() {
    this.userService.refreshToken();
    this.token = this.userService.getToken();
  }

  logout() {
    this.userService.logout();
    this.token = this.userService.getToken();
  }
}
