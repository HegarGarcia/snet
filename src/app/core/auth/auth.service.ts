import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface IUser {
  uid: string;
  name: string;
  photoURL: string;
  email: string;
  address?: string;
  phone?: string;
}

@Injectable({
  providedIn: CoreModule
})
export class AuthService {
  public user: Observable<IUser>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  public async signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    await this.signInWithProvider(provider);
  }

  public async signInWithFacebook() {
    const provider = new auth.FacebookAuthProvider();
    await this.signInWithProvider(provider);
  }

  private async signInWithProvider(provider: auth.AuthProvider) {
    const { user, additionalUserInfo } = await this.afAuth.auth.signInWithPopup(
      provider
    );

    if (additionalUserInfo.isNewUser) {
      const userData: IUser = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      };

      this.afs.doc(`users/${user.uid}`).set(userData);
    }

    this.router.navigate(['/']);
  }

  public async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }
}
