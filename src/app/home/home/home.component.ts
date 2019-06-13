import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from "@angular/fire/firestore";
import { PostsService, IPost } from '@core/posts/posts.service';
import { Observable } from 'rxjs';
import { AuthService, IUser } from '@core/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public task: AngularFireUploadTask;

  // Progress monitoring
  public percentage: Observable<number>;
  public snapshot: Observable<any>;
  public selectedFiles: any;
  public hasImage: boolean;

  public posts: IPost[];
  public contentForm = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(100)
  ]);
  public photoUpload = new FormControl('');
  private user: IUser;

  constructor(private postsService: PostsService, private storage: AngularFireStorage, private db: AngularFirestore, private auth: AuthService) {
    this.auth.user.subscribe(credentials => (this.user = credentials));
  }

  ngOnInit() {
    this.postsService.getTimeline().subscribe(data => (this.posts = data));
    this.hasImage = false;
  }

  submit() {
    if (this.contentForm.valid) {
      if(this.hasImage){
        console.log(this.hasImage);
        this.postsService.add(this.contentForm.value, this.hasImage).then(id => {
          const file = this.selectedFiles;
          const path = `posts/${id.id}`;
          console.log(path);
          this.task = this.storage.upload(path, file);
          this.percentage = this.task.percentageChanges().subscribe(val => console.log(val));
        });
      }
      else {
        console.log(this.hasImage);
        this.postsService.add(this.contentForm.value, this.hasImage)
      }
      this.contentForm.reset();
      this.photoUpload.reset();
    }
  }

  detectFiles(event: FileList) {
    this.selectedFiles = event.item(0);
    this.hasImage = true;
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
}
