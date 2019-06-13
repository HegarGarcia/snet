import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { CoreModule } from '@core/core.module';
import { IUser, AuthService } from '@core/auth/auth.service';
import { take, map, switchMap, mergeMap, tap } from 'rxjs/operators';

export interface IFollower {
  name: string;
  photoURL: string;
}
@Injectable({
  providedIn: CoreModule
})
export class UserService {
  constructor(private afs: AngularFirestore, private auth: AuthService) {}

  public getProfile(uid: string) {
    return this.afs.doc<IUser>(`users/${uid}`).valueChanges();
  }

  public getFollowers(uid: string) {
    return this.afs
      .collection<IFollower>(`users/${uid}/followers`)
      .snapshotChanges()
      .pipe(
        map(followers =>
          followers.map(follower => ({
            uid: follower.payload.doc.id,
            ...follower.payload.doc.data()
          }))
        )
      );
  }

  public getFollowed(uid: string) {
    return this.afs
      .collection<IFollower>(`users/${uid}/followed`)
      .snapshotChanges()
      .pipe(
        map(followers =>
          followers.map(follower => ({
            uid: follower.payload.doc.id,
            ...follower.payload.doc.data()
          }))
        )
      );
  }

  public isFollowing(followed: string) {
    return this.auth.user.pipe(
      switchMap(({ uid }) =>
        this.afs
          .doc<IFollower>(`users/${uid}/followed/${followed}`)
          .snapshotChanges()
          .pipe(map(doc => doc.payload.exists))
      )
    );
  }

  public follow(follower: IUser, followed: IUser) {
    this.afs
      .doc<IFollower>(`users/${follower.uid}/followed/${followed.uid}`)
      .set({
        name: followed.name,
        photoURL: followed.photoURL
      });

    this.afs
      .doc<IFollower>(`users/${followed.uid}/followers/${follower.uid}`)
      .set({ name: follower.name, photoURL: follower.photoURL });
  }
}
