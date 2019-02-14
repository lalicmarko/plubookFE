import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from '../models/dto/user.model';
import {Post} from '../models/dto/post.model';
import {ChatChannel} from '../models/dto/chat.channel.model';
import * as Stomp from '@stomp/stompjs';
import {RESTAPI} from '../rest-api-calls';
import {Message} from '../models/dto/message.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private loggedUserSource = new BehaviorSubject<User>(null);
  private visitedUserSource = new BehaviorSubject<User>(null);
  private searchedUsersSource = new BehaviorSubject<User[]>(null);
  private postsOfFriendsSource = new BehaviorSubject<Post[]>(null);
  private chatChannelsSource = new BehaviorSubject<any>(null);
  private messageSource = new BehaviorSubject<Message>(null);

  public loggedUser = this.loggedUserSource.asObservable();
  public visitedUser = this.visitedUserSource.asObservable();
  public searchedUsers = this.searchedUsersSource.asObservable();
  public postsOfFriends = this.postsOfFriendsSource.asObservable();
  public chatChannels = this.chatChannelsSource.asObservable();
  public message = this.messageSource.asObservable();

  stompClient;

  constructor() {
  }

}
