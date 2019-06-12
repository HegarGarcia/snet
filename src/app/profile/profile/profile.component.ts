import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService, IUser } from '@core/auth/auth.service';
import { PostsService, IPost } from '@core/posts/posts.service';
import { switchMap } from 'rxjs/operators';
import { ProfileService } from '@core/profile/profile.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public posts: Observable<IPost[]>;
  public user: Observable<IUser>;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.user = this.route.paramMap.pipe(
      switchMap(
        params => params.has('id') && this.profileService.get(params.get('id'))
      )
    );

    this.posts = this.user.pipe(
      switchMap(({ uid }) => uid && this.postsService.from(uid))
    );
  }
}
