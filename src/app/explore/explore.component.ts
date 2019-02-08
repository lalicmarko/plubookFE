import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  toShow = false;
  photos = [
    'baba',
    'bababa',
    '33333',
    'wwrw',
    'asdas',
    '52fssf',
    'popopopo'
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
  }

}
