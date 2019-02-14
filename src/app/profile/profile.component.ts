import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../shared/services/data.service';
import {User} from '../shared/models/dto/user.model';
import {Post} from '../shared/models/dto/post.model';
import {HttpClient} from '@angular/common/http';
import {RESTAPI} from '../shared/rest-api-calls';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loggedUser: User;
  private interval;
  private imgURL;
  private title;
  private base64;
  imageSources = [
    'assets/photo1.jpg',
    'assets/photo2.jpg',
    'assets/photo3.jpg',
    'assets/photo1.jpg',
    'assets/photo2.jpg'
  ];

  constructor(private modalService: NgbModal, private http: HttpClient) {
  }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    this.interval  = localStorage.getItem('storyDur');
  }

  openStory(content) {
    this.modalService.open(content, { size: 'lg'});
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      console.log(reader.result);
      this.imgURL = reader.result;
      const baseArray = this.imgURL.split(',');
      this.base64 = baseArray[1];
    };
  }

  onTitleChanged() {
    console.log(this.title);
  }

  uploadImage() {
    const params = {
      title: this.title,
      photoBase64 : this.base64
    };

    if (this.imgURL.length < 3) {

    }

    this.http.post(RESTAPI.getCreatePostURL(), params).subscribe(
      (res: Post) => {
            console.log(res.photo);
            this.loggedUser.posts.push(res);
      },
      error => {
        console.log(error);
      }
    );
  }

}
