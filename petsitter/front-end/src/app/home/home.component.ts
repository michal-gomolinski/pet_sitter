import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService) {}

  isLoggedIn = false;
  username: any;
  ngOnInit(): void {
    if (this.userService.getToken()) {
      this.username = sessionStorage.getItem('username');
      this.isLoggedIn = true;
      console.log(this.isLoggedIn);
    }
  }
  logout() {
    this.userService.logout();
  }
}
