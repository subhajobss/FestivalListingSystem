import { FestivalListComponent } from './festival-list.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FestivalListRoute } from './festival-list.route';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
      FestivalListComponent
    ],
    imports: [
      CommonModule,
      MatButtonModule,
      RouterModule.forChild(FestivalListRoute)
    ],
    exports:[FestivalListComponent],
    bootstrap: []
  })
  export class FestivalListModule { }