import { Component, OnInit } from '@angular/core';
import { LoginResponse } from '../../models/login/login-response.interface';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { DataService } from 'src/providers/data.service';
import { User } from 'firebase/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: NavController, private toast: ToastController, private data: DataService) { }

  ngOnInit() {
  }
  login(event: LoginResponse) {
    console.log(event);
    if (!event.error) {
      this.toast.create({
        message: `Welcome, ${event.result.email}`,
        duration: 3000
      }).then((data) => {
        data.present();
      });
      this.data.getProfile(event.result as User).subscribe(profile => {
        console.log(profile);
        profile ? this.router.navigateRoot(['/tabs']) : this.router.navigateForward(['/edit-profile']);
      });
      // this.router.navigate([`/tabs`]);
    } else {
      this.toast.create({
        message: event.error.message,
        duration: 3000
      }).then((data) => {
        data.present();
      });
    }
  }
}
