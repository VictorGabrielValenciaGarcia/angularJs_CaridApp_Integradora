import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCampaignsPageRoutingModule } from './create-campaigns-routing.module';

import { CreateCampaignsPage } from './create-campaigns.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCampaignsPageRoutingModule
  ],
  declarations: [CreateCampaignsPage]
})
export class CreateCampaignsPageModule {}
