import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignPageRoutingModule } from './campaign-routing.module';

import { CampaignPage } from './campaign.page';
import { SharedModule } from '../../Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaignPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [CampaignPage]
})
export class CampaignPageModule {}
