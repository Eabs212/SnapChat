import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/providers/data.service';
import { AuthService } from 'src/providers/auth.service';
import { User } from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  list: any;
  constructor(private data: DataService, private auth: AuthService) { }

  ngOnInit() {
  }
following() {
  this.auth.getAuthUser().subscribe((user: User) => {
    this.data.getProfile(user).subscribe(profile => {

      this.data.friendList(profile).subscribe((listF) => {
        this.list = listF;
        console.log(this.list);
      });
   });
  });
}
}
