import { Component, OnInit } from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import {HttpClient} from '@angular/common/http';
import {RESTAPI} from '../shared/rest-api-calls';
import {User} from '../shared/models/dto/user.model';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private stompClient;
  private selectedChat;
  private serverUrl = 'http://localhost:8080/socket';
  private channels: any = [];
  private loggedUser: User;

  constructor(private http: HttpClient) {
    this.initializeWebSocketConn();
    this.getChannels();
  }

  initializeWebSocketConn() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/chat', (message) => {
        if (message.body) {
          const myMsg = JSON.parse(message.body);
          for (const chn of that.channels) {
            if (chn.name === myMsg.channelName) {
              chn.messages.push(myMsg);
            }
          }
        }
      });
    });
  }

  sendMessage(message) {
    const msg = {
      text : message,
      channel : this.selectedChat.name,
      email : this.loggedUser.email
    };
    this.stompClient.send('/app/send/message' , {}, JSON.stringify(msg));
  }

  getChannels() {
    this.http.get(RESTAPI.getChatChannels()).subscribe(
      response => {
        console.log(response);
        this.channels = response;
      }, error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  }

  selectContact(contact) {
    if (contact) {
      console.log(contact);
      this.selectedChat = contact;
    }
  }
}
