import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiCampaignsPageRoutingModule } from './mi-campaigns-routing.module';

import { MiCampaignsPage } from './mi-campaigns.page';
import { SharedModule } from 'src/app/Shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiCampaignsPageRoutingModule,
    SharedModule,
    Ng2SearchPipeModule
  ],
  declarations: [MiCampaignsPage]
})
export class MiCampaignsPageModule {}
