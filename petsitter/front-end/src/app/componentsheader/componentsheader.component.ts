import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-componentsheader',
  templateUrl: './componentsheader.component.html',
  styleUrls: ['./componentsheader.component.scss'],
})
export class ComponentsheaderComponent implements OnInit {
  constructor(private userService: UserService) {}
  deviceXs = false;
  isLoggedIn = false;
  ngOnInit(): void {
    if (this.userService.getToken()) this.isLoggedIn = true;
  }
}
