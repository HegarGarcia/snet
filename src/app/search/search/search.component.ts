import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProfilesService } from '@core/profiles/profiles.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private search: Observable<any>;
  public queryName: string;
  public searchResults: any[];

  constructor(public route: ActivatedRoute, public profiles: ProfilesService) { }

  ngOnInit() {
    this.route.params.subscribe(val => {
      this.profiles.getByName(val.query).subscribe(data => {
        this.searchResults = data
        console.log(this.searchResults);
      });
    });
  }

}
