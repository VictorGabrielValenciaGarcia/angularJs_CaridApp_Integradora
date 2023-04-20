import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CentersMapPageRoutingModule } from './centers-map-routing.module';

import { CentersMapPage } from './centers-map.page';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CentersMapPageRoutingModule,
    SharedModule
  ],
  declarations: [CentersMapPage]
})
export class CentersMapPageModule {}
