import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignsMenuPageRoutingModule } from './campaigns-menu-routing.module';

import { CampaignsMenuPage } from './campaigns-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaignsMenuPageRoutingModule
  ],
  declarations: [CampaignsMenuPage]
})
export class CampaignsMenuPageModule {}
