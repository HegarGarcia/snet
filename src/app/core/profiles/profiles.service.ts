import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: CoreModule
})
export class ProfilesService {
  constructor(private afs: AngularFirestore) {}

  public get(uid: string) {
    return this.afs.doc(`users/${uid}`).valueChanges();
  }
}
