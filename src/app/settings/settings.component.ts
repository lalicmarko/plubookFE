import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private storyDuration = 5; // 5 seconds is default

  constructor(private router: Router) { }

  ngOnInit() {
  }

  changeStoryDuration(storyDuration) {
    this.storyDuration = storyDuration;
    console.log('story duration is now:', this.storyDuration);
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

}
