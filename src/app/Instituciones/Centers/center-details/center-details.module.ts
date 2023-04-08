import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CenterDetailsPageRoutingModule } from './center-details-routing.module';

import { CenterDetailsPage } from './center-details.page';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CenterDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [CenterDetailsPage]
})
export class CenterDetailsPageModule {}
