import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignsMenuPageRoutingModule } from './campaigns-menu-routing.module';

import { CampaignsMenuPage } from './campaigns-menu.page';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaignsMenuPageRoutingModule,
    SharedModule
  ],
  declarations: [CampaignsMenuPage]
})
export class CampaignsMenuPageModule {}
