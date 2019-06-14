import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

import { CoreModule } from '@core/core.module';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: CoreModule
})
export class LoggedinGuard {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.user.pipe(
      take(1),
      map(Boolean),
      tap(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/']);
        }
        return isLoggedIn;
      })
    );
  }
}
