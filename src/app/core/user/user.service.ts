import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { CoreModule } from '@core/core.module';
import { IUser } from '@core/auth/auth.service';

@Injectable({
  providedIn: CoreModule
})
export class UserService {
  constructor(private afs: AngularFirestore) {}

  public getProfile(uid: string) {
    return this.afs.doc<IUser>(`users/${uid}`).valueChanges();
  }

  public getFollowers(uid: string) {
    return this.afs.collection<IUser>(`users/${uid}/followers`).valueChanges();
  }

  public getFollowed(uid: string) {
    return this.afs.collection<IUser>(`users/${uid}/followed`).valueChanges();
  }
}
