import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RESTAPI} from '../shared/rest-api-calls';
import {LoginDTO} from '../shared/models/dto/login.dto';
import {User} from '../shared/models/dto/user.model';
import {DataService} from '../shared/services/data.service';
import {Subscription} from 'rxjs';
import {forEach} from '@angular/router/src/utils/collection';
import {Post} from '../shared/models/dto/post.model';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  toShow = false;
  photoToShow;
  profileToShow: User;
  private selectedPost: Post;
  loggedUser: User;
  profiles: User[] = [];
  followingIds = [];
  subscription = new Subscription();

  constructor(private http: HttpClient, private dataService: DataService) {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    this.loggedUser.following.forEach(el => {
        this.followingIds.push(el.id);
    });
  }

  ngOnInit() {
    this.getUsers();

  }

  getUsers() {
    this.http.get(RESTAPI.getSearchUsersURL()).subscribe(
      (response: User[]) => {
        if (response) {
          console.log(response);
          this.profiles = response;
          this.profiles.forEach(el => {
            if (el.id === this.loggedUser.id) {
              this.profiles.splice(this.profiles.indexOf(el), 1);
            }
          });

        }
      },
      error => {
        console.log(error);
      }
    );
  }

  showProfile(profile) {
    this.toShow = true;
    this.profileToShow = profile;
    this.photoToShow = false;
  }

  followUser(userId) {

    const params = new HttpParams()
      .set('userId', userId);

    console.log(userId);
    this.http.get(RESTAPI.getFollowUserURL(), {params: params}).subscribe(
      (response: Boolean) => {
        if (response) {
          console.log('success');
          this.followingIds.push(userId);
        }
      }, error => {
        console.log(error);
      }
    );
  }

  unfollowUser() {

  }

  previewPhoto(post) {
    console.log(post);
    this.photoToShow = 'http://localhost' + post.photo;
    this.selectedPost = post;
    // this.photoToShow = photo;
  }

  sharePhoto() {

    const params = new HttpParams()
      .set('postId', String(this.selectedPost.id));

    this.http.get(RESTAPI.getSharePostURL(), {params: params}).subscribe(
      res => {
            console.log(res);
            const loggedUser: User = JSON.parse(localStorage.getItem('loggedUser'));
            loggedUser.sharedPosts.push(this.selectedPost);
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      },
      error => {
        console.log(error);
      }
    );
  }
}
