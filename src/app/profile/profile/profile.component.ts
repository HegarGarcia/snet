import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { PostsService, IPost } from '@core/posts/posts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public posts: IPost[];
  constructor(public auth: AuthService, private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getTimeline().subscribe(data => (this.posts = data));
  }

}
