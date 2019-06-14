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
  public user: IUser;
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
    this.user = await this.route.paramMap
      .pipe(
        switchMap(
          params =>
            params.has('id') && this.userService.getProfile(params.get('id'))
        ),
        first()
      )
      .toPromise();

    this.followers = this.userService.getFollowers(this.user.uid);
    this.followed = this.userService.getFollowed(this.user.uid);
    this.posts = this.postsService.from(this.user.uid);
    this.isFollowing = this.userService.isFollowing(this.user.uid);
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
