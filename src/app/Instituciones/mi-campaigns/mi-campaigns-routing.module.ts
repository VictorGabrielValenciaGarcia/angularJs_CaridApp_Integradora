import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiCampaignsPage } from './mi-campaigns.page';

const routes: Routes = [
  {
    path: '',
    component: MiCampaignsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiCampaignsPageRoutingModule {}
