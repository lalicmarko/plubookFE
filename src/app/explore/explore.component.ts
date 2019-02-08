import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  toShow = false;
  photoToShow;

  photos = [
    'assets/photo1.jpg',
    'assets/photo2.jpg',
    'assets/photo3.jpg',
    'assets/photo1.jpg'
  ];

  private profileToShow = {};

  profiles: string[] = [
    'Blabla',
    'TrucTruc',
    'padobran'
  ];

  constructor() { }

  ngOnInit() {
  }

  showProfile(profile) {
    this.toShow = true;
    this.profileToShow = profile;
    this.photoToShow = false;
  }

  previewPhoto(photo) {
    this.photoToShow = photo;
  }
  sharePhoto(photoToShow) {
  }
}
