import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { PostsService, IPost } from '@core/posts/posts.service';
import { AuthService, IUser } from '@core/auth/auth.service';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private user: IUser;
  public posts: Observable<IPost[]>;
  public postForm = this.fb.group({
    content: ['', [Validators.minLength(1), Validators.maxLength(100)]],
    file: [null]
  });

  constructor(
    private postsService: PostsService,
    private storage: AngularFireStorage,
    private auth: AuthService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.user = await this.auth.user.pipe(first()).toPromise();
    this.posts = this.postsService.getTimeline();
  }

  async submit() {
    const { content, file } = this.postForm.value;
    const post = await this.postsService.add(content, Boolean(file));

    if (file) {
      this.storage.upload(`posts/${post.id}`, file);
    }

    this.postForm.reset();
  }

  detectFiles(files: FileList) {
    if (files.length) {
      this.postForm.patchValue({
        file: files.item(0)
      });

      this.cd.markForCheck();
    }
  }

  // // Determines if the upload task is active
  // isActive(snapshot) {
  //   return (
  //     snapshot.state === 'running' &&
  //     snapshot.bytesTransferred < snapshot.totalBytes
  //   );
  // }
}
