import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WithFullLayoutComponent } from './with-full-layout/with-full-layout.component';

const routes: Routes = [
  {
    path: '',
    component: WithFullLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: '../pages/pages.module#PagesModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
