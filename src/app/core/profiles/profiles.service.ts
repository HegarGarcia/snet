import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';

import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from '@core/auth/auth.service';

import { take } from 'rxjs/operators';

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
}
