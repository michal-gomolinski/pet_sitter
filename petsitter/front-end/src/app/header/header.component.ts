import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private userService: UserService) {}
  deviceXs = false;
  isLoggedIn = false;
  ngOnInit(): void {
    if (this.userService.getToken()) this.isLoggedIn = true;
  }
}
