import { Component, Inject } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { ProfilesService } from '@core/profiles/profiles.service';
import { FormControl, Validators } from '@angular/forms';


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
  constructor(public auth: AuthService, public profiles: ProfilesService) {}

  submit(){
    this.profiles.getByName(this.searchInput.value).subscribe(data => {
      this.searchResults = data;
      console.log(this.searchResults);
    });
  }
}


