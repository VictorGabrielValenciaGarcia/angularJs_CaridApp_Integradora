import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CentersMapPage } from './centers-map.page';

const routes: Routes = [
  {
    path: '',
    component: CentersMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CentersMapPageRoutingModule {}
