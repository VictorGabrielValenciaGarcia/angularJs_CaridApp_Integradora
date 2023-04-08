import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCampaignsPage } from './create-campaigns.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCampaignsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCampaignsPageRoutingModule {}
