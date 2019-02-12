import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../shared/services/data.service';
import {User} from '../shared/models/dto/user.model';
import {Post} from '../shared/models/dto/post.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loggedUser: User;

  constructor(private modalService: NgbModal,
              private dataService: DataService) {
    this.dataService.loggedUser.subscribe(val => {
      this.loggedUser = val;
    });
  }

  ngOnInit() {
  }

  openStory(content) {
    this.modalService.open(content, { size: 'lg'});
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    console.log(file);
  }

}
