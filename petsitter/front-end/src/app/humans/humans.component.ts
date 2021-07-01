import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-humans',
  templateUrl: './humans.component.html',
  styleUrls: ['./humans.component.scss'],
})
export class HumansComponent implements OnInit {
  constructor(private userService: UserService) {}
  public humans;

  ngOnInit(): void {
    this.getHumans();
  }
  getHumans() {
    this.userService.listHuman().subscribe(
      (data) => {
        this.humans = data;
      },

      (err) => console.error(err),

      () => console.log('done loading posts')
    );
  }
}
