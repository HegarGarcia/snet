import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { take } from 'rxjs/operators';

import { PostsService, IPost } from '@core/posts/posts.service';
import { ProfilesService } from '@core/profiles/profiles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;
  public posts: IPost[];
  public contentForm = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(100)
  ]);

  constructor(private postsService: PostsService, private ngZone: NgZone, private profiles: ProfilesService) {}

  ngOnInit() {
    this.postsService.getTimeline().subscribe(data => (this.posts = data));
  }

  triggerResize() {
    this.ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  submit() {
    if (this.contentForm.valid) {
      this.postsService.add(this.contentForm.value);
      this.contentForm.reset();
    }
  }
}
