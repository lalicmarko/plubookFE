import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../shared/models/dto/user.model';
import {Post} from '../shared/models/dto/post.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  private posts: Post[];

  constructor() { }

  ngOnInit() {
    this.posts = JSON.parse(localStorage.getItem('otherPosts'));
    console.log(this.posts);
  }

}
