import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService) {}
  public new_human: any;
  profile: any;
  ngOnInit(): void {
    this.getProfile();
    this.new_human = {};
  }
  getProfile() {
    this.userService.getProfile().subscribe(
      (data) => {
        console.log(data);
        this.profile = data;
      },

      (error) => {
        console.error('Error saving!');
        return throwError(error);
      }
    );
  }
  createHuman() {
    this.userService
      .createHuman(this.new_human, this.userService.token)
      .subscribe(
        (data) => {
          window.location.reload();
          return true;
        },
        (error) => {
          console.error('Error saving!');
          return throwError(error);
        }
      );
  }
}
