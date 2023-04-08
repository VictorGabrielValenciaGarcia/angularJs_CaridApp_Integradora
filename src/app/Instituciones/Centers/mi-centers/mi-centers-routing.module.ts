import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiCentersPage } from './mi-centers.page';

const routes: Routes = [
  {
    path: '',
    component: MiCentersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiCentersPageRoutingModule {}
