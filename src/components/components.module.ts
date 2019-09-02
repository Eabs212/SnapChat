import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileSearchComponent } from './profile-search/profile-search.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [IonicModule, FormsModule, CommonModule],
  declarations:
  [ LoginFormComponent,
    RegisterFormComponent,
    EditProfileFormComponent,
    ProfileDetailComponent,
    ProfileSearchComponent],
  exports:
  [LoginFormComponent,
    RegisterFormComponent,
    EditProfileFormComponent,
    ProfileDetailComponent,
    ProfileSearchComponent]
})
export class ComponentModule {}
