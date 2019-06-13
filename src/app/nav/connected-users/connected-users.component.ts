import { Component, OnInit, Input } from '@angular/core';
import { PresenceService } from '@core/presence/presence.service';
import { UserService, IFollower } from '@core/user/user.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';

export interface IStatus {
  name: string;
  photoURL: string;
  status: string;
  uid?: string;
}

@Component({
  selector: 'app-connected-users',
  templateUrl: './connected-users.component.html',
  styleUrls: ['./connected-users.component.css']
})
export class ConnectedUsersComponent implements OnInit {
  public presenceData: Observable<IStatus[]>;
  @Input() uid: string;

  constructor(private presence: PresenceService, private user: UserService) {}

  async ngOnInit() {
    this.presenceData = this.user.getFollowed(this.uid).pipe(
      switchMap(followers => {
        const status = followers.map(follower =>
          this.presence
            .getPresence(follower.uid)
            .pipe(map(state => state && { status: state.status, ...follower }))
        );
        return combineLatest(status);
      })
    );
  }
}
