import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { AuthService } from '@core/auth/auth.service';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import { switchMap } from 'rxjs/operators';

export interface IPost {
  id: string;
  content: string;
  publisher: string;
  likeCount: number;
  timestamp: string;
}

@Injectable({
  providedIn: CoreModule
})
export class PostsService {
  private posts: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.posts = this.afs.collection('post');
  }

  public getTimeline() {
    return this.auth.user.pipe(
      switchMap(user => {
        return this.afs
          .collection<IPost>(`users/${user.uid}`, ref =>
            ref.orderBy('timestamp', 'desc')
          )
          .valueChanges();
      })
    );
  }

  public get(id: string) {
    return this.posts.doc<IPost>(id).valueChanges();
  }

  public add(post: IPost) {
    return this.posts.add(post);
  }

  public delete(id: string) {
    return this.posts.doc(id).delete();
  }

  public edit(id: string, post: IPost) {
    return this.posts.doc(id).set(post);
  }

  public from(uid: string) {
    return this.afs
      .collection<IPost>('posts', ref =>
        ref.where('uid', '==', uid).orderBy('timestamp', 'desc')
      )
      .valueChanges();
  }
}
