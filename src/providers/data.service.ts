import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { User } from 'firebase/app';
import { Profile } from '../models/profile/profile.interface';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  profileObject: AngularFireObject<Profile>;
  profileList: AngularFireList<Profile>;
  constructor(private database: AngularFireDatabase) { }

   addFriend(user1: Profile, user2: Profile) {
      console.log(user2);
      try {
      this.database.database.ref(`/friends/${user1.uid}/friends`).push(user2);
      this.database.database.ref(`/friends/${user2.uid}/friends`).push(user1);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  deleteFriend(user1: Profile, user2: Profile) {
    try {
      this.database.list(`/friends/${user1.uid}/friends`, res =>
      res.orderByChild('email').equalTo(user2.email)).remove();
      this.database.list(`/friends/${user2.uid}/friends`, res =>
      res.orderByChild('email').equalTo(user1.email)).remove();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  isFriend(user1: Profile, user2: Profile) {
    try {
      const isFriend = this.database.list(`/friends/${user1.uid}/friends`, res =>
      res.orderByChild('email').equalTo(user2.email)).valueChanges();
      return isFriend as unknown as Observable<any>;
    } catch (e) {
      console.log(e);
    }
  }

  friendList(user: Profile) {
    try {
      console.log(user);
      const list = this.database.list(`/friends/${user.uid}/friends`).valueChanges();
      return list as unknown as Observable<any>;
    } catch (e) {
      console.log(e);
    }
  }

  searchUser(val: string) {
    this.profileList = this.database.list('profiles', ref =>
    ref.orderByChild('firstName').equalTo(val)).valueChanges() as unknown as AngularFireList<Profile>;
    return this.profileList as unknown as Observable<any>;
  }

  getProfile(user: User) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`).valueChanges() as unknown as AngularFireObject<Profile>;
    return  this.profileObject as unknown as Observable<any>;
  }

  async saveProfile(user: User, profile: Profile) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`);
    try {
      await this.profileObject.set(profile);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
