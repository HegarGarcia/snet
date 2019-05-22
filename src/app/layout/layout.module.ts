import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WithfulllayoutComponent } from './withfulllayout/withfulllayout.component';
import { WithFullLayoutComponent } from './with-full-layout/with-full-layout.component';
import { WithFooterOnlyLayoutComponent } from './with-footer-only-layout/with-footer-only-layout.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, WithfulllayoutComponent, WithFullLayoutComponent, WithFooterOnlyLayoutComponent],
  imports: [CommonModule, LayoutRoutingModule]
})
export class LayoutModule {}
