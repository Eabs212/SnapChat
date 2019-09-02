import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/providers/data.service';
import { Profile } from 'src/models/profile/profile.interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/providers/auth.service';
import { User } from 'firebase';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.scss'],
})
export class ProfileSearchComponent implements OnInit {
  query: string;
  userProfile: Profile;
  profileList: Profile[];
  constructor(private data: DataService, private router: Router, private auth: AuthService) {}
  ngOnInit() {
    this.auth.getAuthUser().subscribe((user: User) => {
      this.data.getProfile(user).subscribe((profile: Profile) => {
      this.userProfile = profile as Profile;
      });
    });
  }

  search(query: string) {
    const trimQuery = query.trim();
    // if (trimQuery !== this.userProfile.firstName) {
    if (trimQuery === query) {
        console.log(this.profileList);
        this.data.searchUser(query.toLowerCase()).subscribe(profiles => {
          this.profileList = profiles;
          console.log(profiles);
        });
      }
    // }
  }

  getUser(profile: Profile) {

    profile.email !== this.userProfile.email ? this.router
    .navigate([`/user`, profile]) : this.router.navigate([`/tabs/profile`]);
  }
}
