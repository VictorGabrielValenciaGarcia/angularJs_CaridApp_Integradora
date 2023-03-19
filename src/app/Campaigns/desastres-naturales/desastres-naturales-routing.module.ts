import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesastresNaturalesPage } from './desastres-naturales.page';

const routes: Routes = [
  {
    path: '',
    component: DesastresNaturalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesastresNaturalesPageRoutingModule {}
