import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/providers/data.service';
import { Profile } from 'src/models/profile/profile.interface';

@Component({
  selector: 'app-list-following',
  templateUrl: './list-following.page.html',
  styleUrls: ['./list-following.page.scss'],
})
export class ListFollowingPage implements OnInit {
  list = [];
  user = {uid: ''} as Profile;
  constructor(private params: ActivatedRoute, private data: DataService, private router:Router) {
    console.log(this.params);
    this.params.paramMap.subscribe(paramMap => {
      console.log(paramMap.keys);
      paramMap.keys.map(i => {
        console.log(paramMap.get(i));
      });
      this.user.uid = paramMap.get('uid');
      this.data.friendList(this.user).subscribe(listF => {
        this.list = listF;
        console.log(this.list);
      });
    });
   }

  ngOnInit() {
  }
  login(user){
    this.router.navigate([`/chat`, {
      user: user
    }])
  }
}
