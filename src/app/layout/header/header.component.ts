import { Component, OnInit } from '@angular/core';

import { SidenavService } from '@core/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private sidenavService: SidenavService) {}

  public toggleSidenav() {
    this.sidenavService.toggle();
  }

  ngOnInit() {}
}
