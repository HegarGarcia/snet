import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProfilesService } from '@core/profiles/profiles.service';

import { switchMap } from 'rxjs/operators';
import { IUser } from '@core/auth/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchResults: Observable<IUser[]>;

  constructor(public route: ActivatedRoute, public profiles: ProfilesService) {}

  ngOnInit() {
    this.searchResults = this.route.params.pipe(
      switchMap(param => this.profiles.getByName(param.q))
    );
  }
}
