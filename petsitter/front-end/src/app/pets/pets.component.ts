import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent implements OnInit {
  public pets;
  public new_pet: any;
  constructor(private userService: UserService) {}
  error = false;
  getPets() {
    this.userService.list().subscribe(
      (data) => {
        this.pets = data;
        for (let post of this.pets) {
          post.date = new Date(post.date);
        }
      },

      (err) => {
        console.error(err);
        this.error = true;
      }
    );
  }

  createPet() {
    this.userService.create(this.new_pet, this.userService.token).subscribe(
      (data) => {
        this.getPets();
        return true;
      },
      (error) => {
        console.error('Error saving!');
        return throwError(error);
      }
    );
  }
  ngOnInit(): void {
    this.getPets();
    this.new_pet = {};
  }
}
