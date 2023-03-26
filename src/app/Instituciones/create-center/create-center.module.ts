import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCenterPageRoutingModule } from './create-center-routing.module';

import { CreateCenterPage } from './create-center.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCenterPageRoutingModule
  ],
  declarations: [CreateCenterPage]
})
export class CreateCenterPageModule {}
