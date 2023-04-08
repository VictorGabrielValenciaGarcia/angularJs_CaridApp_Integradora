import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCenterPage } from './create-center.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCenterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCenterPageRoutingModule {}
