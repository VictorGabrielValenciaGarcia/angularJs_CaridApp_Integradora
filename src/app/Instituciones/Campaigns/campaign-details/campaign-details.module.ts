import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignDetailsPageRoutingModule } from './campaign-details-routing.module';

import { CampaignDetailsPage } from './campaign-details.page';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaignDetailsPageRoutingModule,
    SharedModule,
  ],
  declarations: [CampaignDetailsPage]
})
export class CampaignDetailsPageModule {}
