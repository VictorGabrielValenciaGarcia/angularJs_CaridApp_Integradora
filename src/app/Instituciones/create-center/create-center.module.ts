import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCenterPageRoutingModule } from './create-center-routing.module';

import { CreateCenterPage } from './create-center.page';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCenterPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [CreateCenterPage]
})
export class CreateCenterPageModule {}
