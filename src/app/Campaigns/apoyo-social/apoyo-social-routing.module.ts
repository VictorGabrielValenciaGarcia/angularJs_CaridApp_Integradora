import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApoyoSocialPage } from './apoyo-social.page';

const routes: Routes = [
  {
    path: '',
    component: ApoyoSocialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApoyoSocialPageRoutingModule {}
