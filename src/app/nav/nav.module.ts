import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavRoutingModule } from './nav-routing.module';
import { NavComponent } from './nav/nav.component';
import { ConnectedUsersComponent } from './connected-users/connected-users.component';
import { WithFullLayoutComponent } from './with-full-layout/with-full-layout.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material';

@NgModule({
  declarations: [
    WithFullLayoutComponent,
    NavComponent,
    ConnectedUsersComponent
  ],
  imports: [
    CommonModule,
    NavRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatListModule
  ]
})
export class NavModule {}
