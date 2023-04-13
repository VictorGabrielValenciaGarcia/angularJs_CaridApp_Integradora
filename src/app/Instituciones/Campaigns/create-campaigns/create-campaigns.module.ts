import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCampaignsPageRoutingModule } from './create-campaigns-routing.module';

import { CreateCampaignsPage } from './create-campaigns.page';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCampaignsPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [CreateCampaignsPage]
})
export class CreateCampaignsPageModule {}
