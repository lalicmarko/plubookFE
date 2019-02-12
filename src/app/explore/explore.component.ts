import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RESTAPI} from '../shared/rest-api-calls';
import {LoginDTO} from '../shared/models/dto/login.dto';
import {User} from '../shared/models/dto/user.model';
import {DataService} from '../shared/services/data.service';
import {Subscription} from 'rxjs';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  toShow = false;
  photoToShow;
  profileToShow: User;
  loggedUser: User;
  profiles: User[] = [];
  followingIds = [];
  subscription = new Subscription();

  constructor(private http: HttpClient, private dataService: DataService) {
    this.dataService.loggedUser.subscribe(val => {
      this.loggedUser = val;
      this.loggedUser.following.forEach(el => {
        this.followingIds.push(el.id);
      });
      console.log(this.followingIds);
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

  // unfollowUser() {
  //
  // }

  previewPhoto(post) {
    console.log(post);
    this.photoToShow = 'http://localhost' + post.photo;
    // this.photoToShow = photo;
  }
  sharePhoto(photoToShow) {
  }
}
