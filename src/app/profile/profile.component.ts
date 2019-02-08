import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input()
  name: string;
  @Input()
  surname: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.name = 'Ime autora';
    this.surname = 'Prezime autora';
  }

  openStory(content) {
    this.modalService.open(content, { size: 'lg'});
    console.log('opening modal for story preview');
  }

}
