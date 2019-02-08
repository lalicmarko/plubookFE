import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  imageSources: string[] = [
    'assets/photo1.jpg',
    'assets/photo2.jpg',
    'assets/photo2.jpg',
    'assets/photo3.jpg'
  ];

  @Input()
  name: string;
  @Input()
  surname: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.name = 'Darko';
    this.surname = 'PM';
  }

  openStory(content) {
    this.modalService.open(content, { size: 'lg'});
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    console.log(file);
  }

}
