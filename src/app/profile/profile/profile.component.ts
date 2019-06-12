import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUser } from '@core/auth/auth.service';
import { PostsService, IPost } from '@core/posts/posts.service';
import { UserService } from '@core/user/user.service';

import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public posts: Observable<IPost[]>;
  public user: Observable<IUser>;
  public followers: Observable<IUser[]>;
  public followed: Observable<IUser[]>;
  private uid: string;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.route.paramMap.pipe(
      switchMap(
        params =>
          params.has('id') && this.userService.getProfile(params.get('id'))
      )
    );

    this.followers = this.user.pipe(
      switchMap(user => this.userService.getFollowers(user.uid))
    );
    this.followed = this.user.pipe(
      switchMap(user => this.userService.getFollowed(user.uid))
    );
    this.posts = this.user.pipe(
      switchMap(({ uid }) => uid && this.postsService.from(uid))
    );
  }
}
