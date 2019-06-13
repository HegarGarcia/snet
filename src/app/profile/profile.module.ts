import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent, EditDialog } from './profile/profile.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ProfileComponent, EditDialog],
  entryComponents: [EditDialog],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    MatDividerModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class ProfileModule {}
