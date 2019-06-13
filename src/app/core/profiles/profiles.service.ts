import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';

import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from '@core/auth/auth.service';

import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: CoreModule
})
export class ProfilesService {
  constructor(private afs: AngularFirestore) {}

  public get(uid: string) {
    return this.afs
      .doc<IUser>(`users/${uid}`)
      .valueChanges()
      .pipe(take(1));
  }

  public getByName(name: string) {
    return this.afs
      .collection<IUser>('users', ref => ref.where('name', '==', name))
      .valueChanges({ idField: 'uid' });
  }
}
