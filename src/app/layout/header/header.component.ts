import { Component } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { ProfilesService } from '@core/profiles/profiles.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public searchInput = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(100)
  ]);

  public searchResults: any[];
  constructor(public auth: AuthService, public profiles: ProfilesService,public router: Router) {}

  submit(){
    /*this.profiles.getByName(this.searchInput.value).subscribe(data => {
      this.searchResults = data;
    });*/
    this.router.navigate(["./search", {query: this.searchInput.value}]);
  }
}


