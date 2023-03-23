import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiCentersPageRoutingModule } from './mi-centers-routing.module';

import { MiCentersPage } from './mi-centers.page';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiCentersPageRoutingModule,
    SharedModule
  ],
  declarations: [MiCentersPage]
})
export class MiCentersPageModule {}
