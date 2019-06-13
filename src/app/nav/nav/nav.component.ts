import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { AuthService } from '@core/auth/auth.service';
import { ProfilesService } from '@core/profiles/profiles.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  public showSearch = false;
  public searchInput = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(100)
  ]);

  public searchResults: any[];
  constructor(
    public auth: AuthService,
    public profiles: ProfilesService,
    public router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  submit() {
    this.showSearch = !this.showSearch;
    this.router.navigate(['./search', { q: this.searchInput.value }]);
    this.searchInput.reset();
  }
}
