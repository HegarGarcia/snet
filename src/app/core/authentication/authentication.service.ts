import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { Location } from '@angular/common';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: CoreModule
})
export class AuthenticationService {
  public user: any;
  constructor(private afAuth: AngularFireAuth, private location: Location) {}

  loginWithGoogle() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(credentials => {
        this.user = {
          uid: credentials.user.uid,
          name: credentials.user.displayName,
          photoURL: credentials.user.photoURL,
          email: credentials.user.email,
          seller: false
        };

        return this.location.back();
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
