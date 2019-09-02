import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFireDatabase) { }
  
  getMessages(profile , userId){
    return this.db.list(`/chat/${profile.uid}/${userId}`).valueChanges()
  }
  sendMessages(account, userId, message){
    this.db.list(`/chat/${account.uid}/${userId}`).push({
      userName: account.email,
      message: message
    })
    this.db.list(`/chat/${userId}/${account.uid}`).push({
      userName: account.email,
      message: message
    })
  }
}
