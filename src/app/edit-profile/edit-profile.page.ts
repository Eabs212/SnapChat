import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Profile } from '../../models/profile/profile.interface';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  profile = {} as Profile;
  more = false;
  new = true;
  constructor(private router: NavController, private params: ActivatedRoute) {
    console.log(this.params);
    this.params.paramMap.subscribe(paramMap => {
      console.log(paramMap.keys);
      console.log(paramMap.has('firstName') + ' ' + paramMap.get('lastName') );
      this.new = !paramMap.has('firstName');
      console.log(this.new);
      this.profile.firstName = paramMap.get('firstName');
      this.profile.lastName = paramMap.get('lastName');
      if (paramMap.has('dateOfBirth')) {
      this.profile.dateOfBirth = new Date(paramMap.get('dateOfBirth')).toISOString() as unknown as Date;
      }
      console.log(this.profile);
    });
   }

  ngOnInit() {
  }
  saveProfile(event: boolean) {
    event ? this.router.navigateRoot(['/tabs']) : console.log('error');
  }
}
