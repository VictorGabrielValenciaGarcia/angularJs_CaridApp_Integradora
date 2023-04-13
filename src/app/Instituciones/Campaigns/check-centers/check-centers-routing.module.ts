import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckCentersPage } from './check-centers.page';

const routes: Routes = [
  {
    path: '',
    component: CheckCentersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckCentersPageRoutingModule {}
