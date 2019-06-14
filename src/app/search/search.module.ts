import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search/search.component';
import { ResultCardComponent } from './result-card/result-card.component';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [SearchComponent, ResultCardComponent],
  imports: [CommonModule, RouterModule, SearchRoutingModule, MatCardModule]
})
export class SearchModule {}
