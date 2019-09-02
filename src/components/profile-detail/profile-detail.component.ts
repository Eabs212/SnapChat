import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from 'src/providers/auth.service';
import { DataService } from 'src/providers/data.service';
import { Profile } from 'src/models/profile/profile.interface';
import { User } from 'firebase';
import {LoadingController, NavController} from '@ionic/angular';
@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
})
export class ProfileDetailComponent implements OnInit {
  userProfile: Profile;
  accountProfile: Profile;
  followingUser = false;
  list = [];
  @Output() existingProfile: EventEmitter<Profile>;
  @Input() profile: Profile;
  constructor(private auth: AuthService, private data: DataService,
              private loading: LoadingController, private nav: NavController) {
                this.existingProfile = new EventEmitter<Profile>();
                /* this.userProfile = {firstName: 'emilio', lastName: 'barboza',
                dateOfBirth: '1997-11-29T18:00:07.423Z' as unknown as Date,
                email: 'p@p.com'} as Profile;
                this.list = [{firstName: 'emilio', lastName: 'barboza',
                dateOfBirth: '1997-11-29T18:00:07.423Z' as unknown as Date,
                email: 'p@p.com'}, {firstName: 'emilio', lastName: 'barboza',
                dateOfBirth: '1997-11-29T18:00:07.423Z' as unknown as Date,
                email: 'p@p.com'}];
                // this.following(); */
               }

  ngOnInit() {
    if (this.profile) {
      this.userProfile = this.profile;
      this.auth.getAuthUser().subscribe((user: User) => {
        this.data.getProfile(user).subscribe((profile: Profile) => {
          this.accountProfile = profile;
          this.data.isFriend(this.accountProfile, this.userProfile).subscribe((data) => {
          console.log(data);
          data.length ? this.followingUser = true : this.followingUser = false;
          this.friendList();
          console.log(this.followingUser);
        });
        });
      });
    } else {
      // this.loading.create({message: 'Loading profile..'}).then((res) => res.present());
      this.auth.getAuthUser().subscribe((user: User) => {
        this.data.getProfile(user).subscribe((profile: Profile) => {
          this.userProfile = profile as Profile;
          this.existingProfile.emit(this.userProfile);
          console.log(this.userProfile);
          // this.loading.dismiss();
          this.friendList();
        });
      });
    }
    console.log(this.accountProfile);
  }

  addFriend() {
      const result = this.data.addFriend(this.accountProfile, this.userProfile);
      console.log(result);
  }

  friendList() {
     this.data.friendList(this.userProfile).subscribe((listF) => {
       this.list = listF;
       console.log(this.list);
     });
  }
  deleteFriend() {
    const result = this.data.deleteFriend(this.accountProfile, this.userProfile);
    console.log(result);
  }

  logout() {
    this.auth.logout();
    this.nav.navigateRoot([`/login`]);
  }

  navigate() {
    const user = this.userProfile;
    this.nav.navigateForward([`/list-following`, user]);
  }

}
