import {Component, Input, OnInit} from '@angular/core';
import $ from 'jquery';
import {DatePipe} from '@angular/common';
import {concat} from 'rxjs';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  comments: string[] = [];
  // private photoUrl = 'https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80';
  @Input()
  private photoUrl;
  @Input()
  private autor;

  constructor(public datepipe: DatePipe) {
  }

  addComment(comment) {
    if (comment) {
      let newCommentWithDate = comment.toString();
      const date = this.datepipe.transform(new Date(), 'HH:mm yyyy-MM-dd');
      newCommentWithDate = newCommentWithDate.concat(date);
      this.comments.push(newCommentWithDate);
      console.log(date);
    }
    $('#input').val('');

    console.log('comments:', this.comments);
  }

  ngOnInit() {
  }

}
