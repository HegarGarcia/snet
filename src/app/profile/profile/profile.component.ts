import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUser, AuthService } from '@core/auth/auth.service';
import { PostsService, IPost } from '@core/posts/posts.service';
import { UserService, IFollower } from '@core/user/user.service';

import { switchMap, take, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public posts: Observable<IPost[]>;
  public user: Observable<IUser>;
  public followers: Observable<IFollower[]>;
  public followed: Observable<IFollower[]>;
  public isFollowing;
  public profile;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private postsService: PostsService,
    public userService: UserService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.user = this.route.paramMap.pipe(
      switchMap(
        params =>
          params.has('id') && this.userService.getProfile(params.get('id'))
      )
    );

    this.followers = this.user.pipe(
      switchMap(({ uid }) => this.userService.getFollowers(uid))
    );

    this.followed = this.user.pipe(
      switchMap(({ uid }) => this.userService.getFollowed(uid))
    );

    this.posts = this.user.pipe(
      switchMap(({ uid }) => uid && this.postsService.from(uid))
    );

    this.isFollowing = this.user.pipe(
      switchMap(({ uid }) => uid && this.userService.isFollowing(uid))
    );
  }

  async openDialog() {
    const { uid, name } = await this.auth.user.pipe(first()).toPromise();

    const dialog = this.dialog.open(EditDialogComponent, {
      width: '350px',
      data: name
    });

    dialog
      .afterClosed()
      .subscribe(
        newName => newName && this.userService.updateName(uid, newName)
      );
  }
}
