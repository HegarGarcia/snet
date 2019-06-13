import { Component, Input } from '@angular/core';

export interface IResult {
  name: string;
  email: string;
  photoURL: string;
}

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css']
})
export class ResultCardComponent {
  @Input() res: IResult;

  constructor() { }

}
