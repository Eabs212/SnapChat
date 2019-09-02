import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/models/profile/profile.interface';
import { NavParams, NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  existingProfile = {} as Profile;
  constructor(private router: Router, ) { }

  ngOnInit() {
  }
  getProfile(profile: Profile) {
    this.existingProfile = profile;
  }
  navigate(route: string) {
    console.log(route);
    this.router.navigate([`/${route}`, this.existingProfile]);
  }
}
