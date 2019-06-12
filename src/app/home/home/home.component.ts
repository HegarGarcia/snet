import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { PostsService, IPost } from '@core/posts/posts.service';
import { ProfilesService } from '@core/profiles/profiles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public posts: IPost[];
  public contentForm = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(100)
  ]);

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getTimeline().subscribe(data => (this.posts = data));
  }

  submit() {
    if (this.contentForm.valid) {
      this.postsService.add(this.contentForm.value);
      this.contentForm.reset();
    }
  }
}
