import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Post} from '../shared/models/dto/post.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RESTAPI} from '../shared/rest-api-calls';
import {Comment} from '../shared/models/dto/comment.model';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  comments: string[] = [];
  // private photoUrl = 'https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80';
  @Input()
  private post: Post;

  constructor(public datepipe: DatePipe, public http: HttpClient) {
  }

  addComment(comment) {
    if (comment) {
      const params = {
        postId: this.post.id,
        content: comment
      };
      this.http.post(RESTAPI.getPostCommentUrl(), params).subscribe(
        (res: Comment) => {
          console.log(res);
          this.post.totalCommments += 1;
          this.post.comments.push(res);
        }, error1 => {
          console.log(error1);
        }
      );
    }

    console.log('comments:', this.comments);
  }

  addLike () {

    const params = new HttpParams()
      .set('postId', String(this.post.id));

    this.http.get(RESTAPI.getLikePostURL(), {params: params}).subscribe(
      res => {
        console.log(res);
        this.post.totalLikes += 1;
      }
    );
  }

  ngOnInit() {
  }

}
