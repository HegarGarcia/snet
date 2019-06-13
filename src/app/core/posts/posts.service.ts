import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { AuthService, IUser } from '@core/auth/auth.service';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import { switchMap, map } from 'rxjs/operators';
import { firestore } from 'firebase';
import { of } from 'rxjs';

export interface IPost {
  id?: string;
  content: string;
  publisher: string;
  publisherPhotoURL: string;
  publisherName: string;
  likeCount: number;
  timestamp: firestore.Timestamp;
  hasImage?: boolean;
}

@Injectable({
  providedIn: CoreModule
})
export class PostsService {
  private posts: AngularFirestoreCollection;
  private increment = firestore.FieldValue.increment(1);
  private user: IUser;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.posts = this.afs.collection('posts');
    this.auth.user.subscribe(credentials => (this.user = credentials));
  }

  public getTimeline() {
    return this.auth.user.pipe(
      switchMap(user =>
        user
          ? this.afs
              .collection<IPost>(`users/${user.uid}/timeline`, ref =>
                ref.orderBy('timestamp', 'desc')
              )
              .valueChanges({ idField: 'uid' })
          : of(null)
      )
    );
  }

  public get(id: string) {
    return this.posts.doc<IPost>(id).valueChanges();
  }

  public add(content: string, hasImage: boolean) {
    const post: IPost = {
      publisher: this.user.uid,
      likeCount: 0,
      publisherName: this.user.name,
      publisherPhotoURL: this.user.photoURL,
      timestamp: firestore.Timestamp.fromDate(new Date()),
      content,
      hasImage
    };

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
        ref.where('publisher', '==', uid).orderBy('timestamp', 'desc')
      )
      .valueChanges();
  }

  public like(id: string) {
    this.afs.doc(`posts/${id}`).update({ likeCount: this.increment });
  }
}
