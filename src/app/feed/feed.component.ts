import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  posts = [
    {
      autor : 'Marko',
      imgUrl : 'assets/photo1.jpg'
    },
    {
      autor : 'Blarko',
      imgUrl : 'assets/photo2.jpg'
    },
    {
      autor : 'Zarko',
      imgUrl : 'assets/photo3.jpg'
    },
    {
      autor : 'Dole',
      imgUrl : 'assets/photo2.jpg'
    },
    {
      autor : 'Dole',
      imgUrl : 'assets/photo2.jpg'
    }

  ];
  constructor() { }

  ngOnInit() {
  }

}
