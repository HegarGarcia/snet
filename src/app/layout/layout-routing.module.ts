import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WithFullLayoutComponent } from './with-full-layout/with-full-layout.component';
import { AuthGuard } from '@core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: WithFullLayoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: '../home/home.module#HomeModule'
      },
      {
        path: 'login',
        loadChildren: '../login/login.module#LoginModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
