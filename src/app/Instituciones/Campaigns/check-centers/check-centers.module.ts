import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckCentersPageRoutingModule } from './check-centers-routing.module';

import { CheckCentersPage } from './check-centers.page';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckCentersPageRoutingModule,
    SharedModule
  ],
  declarations: [CheckCentersPage]
})
export class CheckCentersPageModule {}
