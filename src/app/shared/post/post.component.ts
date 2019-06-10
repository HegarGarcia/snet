import { Component, Input } from '@angular/core';

import { IPost, PostsService } from '@core/posts/posts.service';
import { IUser } from '@core/auth/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post: IPost;

  public user: IUser;

  constructor(public posts: PostsService) {}

  like() {
    this.posts.like(this.post.id);
  }
}
