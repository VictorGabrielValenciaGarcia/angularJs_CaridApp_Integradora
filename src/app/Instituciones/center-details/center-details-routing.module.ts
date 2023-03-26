import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CenterDetailsPage } from './center-details.page';

const routes: Routes = [
  {
    path: '',
    component: CenterDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CenterDetailsPageRoutingModule {}
