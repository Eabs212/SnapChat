import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/providers/auth.service';
import { User } from 'firebase';
import {IonContent} from '@ionic/angular'
import { Profile } from 'src/models/profile/profile.interface';
import { DataService } from 'src/providers/data.service';
import { ChatService } from 'src/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  user:string = ''
  message:string = ''
  messages: any[];
  account: any;
  container: HTMLElement;          
  @ViewChild(IonContent,{static:false}) contentArea: IonContent
  constructor(private navParam: ActivatedRoute ,private chat: ChatService,
    private auth: AuthService, private data: DataService) {
    this.navParam.paramMap.subscribe((paramMap)=>{
      this.user = paramMap.get('user')
    })
    this.auth.getAuthUser().subscribe((user: User) => {
      this.data.getProfile(user).subscribe((profile: Profile) => {
        this.account = profile
    this.chat.getMessages(this.account, this.user).subscribe(data => {
      this.messages = data
    });
  });
});

  }
  ngAfterViewInit(): void {
    this.container = document.getElementById("chatMessage");           
    this.container.scrollTop = this.container.scrollHeight;  
    }
  ngOnInit(){ 
  }
  
  async sendMessage(){
     await this.chat.sendMessages(this.account, this.user, this.message);
      this.message = ''
      this.contentArea.scrollToBottom();

  }

}
