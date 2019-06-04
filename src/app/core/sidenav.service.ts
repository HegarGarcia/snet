import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: CoreModule
})
export class SidenavService {
  private sidenav: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public toggle() {
    this.sidenav.toggle();
  }
}
