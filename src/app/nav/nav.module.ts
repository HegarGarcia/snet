import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavRoutingModule } from './nav-routing.module';

import { HeaderComponent } from './header/header.component';

import { WithFullLayoutComponent } from './with-full-layout/with-full-layout.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material';

@NgModule({
  declarations: [
    HeaderComponent,
    WithFullLayoutComponent,
    SidenavComponent,
    NavComponent
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
