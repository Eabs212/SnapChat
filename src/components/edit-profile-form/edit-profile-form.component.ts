import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Profile } from '../../models/profile/profile.interface';
import { User } from 'firebase/app';
import { Subscription } from 'rxjs';
import { AuthService } from '../../providers/auth.service';
import { DataService } from '../../providers/data.service';
import { Account } from 'src/models/account/account.interface';
@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss'],
})
export class EditProfileFormComponent implements OnInit, OnDestroy {

  @Output() saveProfile = new EventEmitter<boolean>();
  @Input() profile: Profile;
  @Input() more: boolean;
  account = {} as Account;
  changeP = false;
  newPassword = '';
  newEmail: string;
  text = 'Change Password';
  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  constructor(private auth: AuthService, private data: DataService) {
    this.authenticatedUser$ = this.auth.getAuthUser().subscribe((user: User) => {
      this.authenticatedUser = user;
      this.account.email = user.email;
      this.newEmail = user.email;
    });
   }

  ngOnInit() {
    if (!this.profile) {
      this.profile = {} as Profile;
    }
  }
  async changeProfile() {
    if (this.more) {
      if (!this.changeP) {
        const result = await this.auth.changeEmail(this.account, this.newEmail);
        console.log(result);
        this.Save();
      } else {
        const result = await this.auth.changePassword(this.account, this.newPassword);
        this.saveProfile.emit(result);
      }
    } else {
      this.Save();
    }
  }

  change() {
    if (!this.changeP) {
      this.changeP = true;
      this.text = 'Change Email';
    } else {
      this.changeP = false;
      this.text = 'Change Password';
    }
    console.log(this.changeP);
  }

  async Save() {
    if (this.authenticatedUser) {
      console.log(this.authenticatedUser);
      !this.more ? this.profile.email = this.authenticatedUser.email : this.profile.email = this.newEmail;
      this.profile.firstName = this.profile.firstName.toLowerCase();
      this.profile.lastName = this.profile.lastName.toLowerCase();
      this.profile.uid = this.authenticatedUser.uid;
      console.log(this.profile);
      const result = await this.data.saveProfile(this.authenticatedUser, this.profile);
      this.saveProfile.emit(result);
      console.log(result);
    }
  }
  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }
}
