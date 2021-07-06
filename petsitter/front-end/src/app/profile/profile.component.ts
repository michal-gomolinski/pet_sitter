import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { throwError } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService) {}
  public new_human: {
    first_name: string;
    last_name: string;
    rate_per_hour: number;
    //picture: File;
  };
  cover: File;
  profile: any;
  ngOnInit(): void {
    this.getProfile();
    this.new_human = {
      first_name: '',
      last_name: '',
      rate_per_hour: 0,
      //picture: null,
    };
  }
  onImageChanged(event: any) {
    this.cover = event.target.files[0];
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
    var formData = new FormData();
    for (var [key, value] of Object.entries(this.new_human)) {
      if (typeof value == 'number') value = String(value);
      formData.append(key, value);
    }

    if (this.cover) {
      formData.append('picture', this.cover);
      //this.new_human.picture = this.cover;
    }
    console.log(this.new_human);
    this.userService.createHuman(formData).subscribe(
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
