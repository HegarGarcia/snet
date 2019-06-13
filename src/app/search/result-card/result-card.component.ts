import { Component, Input } from '@angular/core';
import { IUser } from '@core/auth/auth.service';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css']
})
export class ResultCardComponent {
  @Input() res: IUser;

  constructor() {}
}
