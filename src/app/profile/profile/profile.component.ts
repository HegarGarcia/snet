import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUser, AuthService } from '@core/auth/auth.service';
import { PostsService, IPost } from '@core/posts/posts.service';
import { UserService, IFollower } from '@core/user/user.service';
import { ReactiveFormsModule, FormControl, Validators  } from '@angular/forms';

import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  ngOnInit() {
    this.user = this.route.paramMap.pipe(
      switchMap(
        params =>
          params.has('id') && this.userService.getProfile(params.get('id'))
      )
    );
    this.user.pipe(
      switchMap(({uid}) => this.userService.getProfile(uid))
    ).subscribe(result => console.log(result));

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

  openDialog(): void {
    this.user.pipe(
      switchMap(({uid}) => this.userService.getProfile(uid))
    ).subscribe(result => {
      const dialogRef = this.dialog.open(EditDialog, {
        width: '350px',
        data: result
      });
    });
  }
}

@Component({
  selector: 'edit-dialog',
  templateUrl: 'edit-dialog.html'
})
export class EditDialog {

  public newName = new FormControl('',[
    Validators.minLength(1),
    Validators.maxLength(100)
  ]);

  constructor(public dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IUser, public userService: UserService){
    }
 
  submit(){
    this.userService.editName(this.data.uid, this.newName.value)
    this.dialogRef.close();
    alert("Se ha cambiado el nombre")
  }
  onNoClick(): void {
    console.log("cancelar")
    this.dialogRef.close();
  }
}
