import { Component, Input, OnInit } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';

import { IPost, PostsService } from '@core/posts/posts.service';
import { IUser, AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: IPost;

  public user: IUser;
  public downloadURL: any;

  constructor(
    public posts: PostsService,
    private storage: AngularFireStorage,
    public auth: AuthService
  ) {}

  ngOnInit() {
    console.log(this.post);
    if (!this.post.hasImage) {
      return;
    }

    this.downloadURL = this.storage
      .ref(`posts/${this.post.id}`)
      .getDownloadURL();
  }
}
