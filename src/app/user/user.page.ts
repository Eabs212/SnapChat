import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/models/profile/profile.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user = {} as Profile;
  constructor(private params: ActivatedRoute, private router: Router) {
    this.params.paramMap.subscribe(paramMap => {
      console.log(paramMap.keys);
      console.log(paramMap.get('firstName') + ' ' + paramMap.get('lastName') );
      this.user.firstName = paramMap.get('firstName');
      this.user.lastName = paramMap.get('lastName');
      this.user.dateOfBirth = new Date(paramMap.get('dateOfBirth')).toISOString() as unknown as Date;
      this.user.uid = paramMap.get('uid');
      this.user.email = paramMap.get('email');
      console.log(this.user);
    });
   }

  ngOnInit() {
  }

}
