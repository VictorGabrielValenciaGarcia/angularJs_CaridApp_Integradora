import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiCampaignsPageRoutingModule } from './mi-campaigns-routing.module';

import { MiCampaignsPage } from './mi-campaigns.page';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiCampaignsPageRoutingModule,
    SharedModule
  ],
  declarations: [MiCampaignsPage]
})
export class MiCampaignsPageModule {}
