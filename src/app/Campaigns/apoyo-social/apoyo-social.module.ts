import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApoyoSocialPageRoutingModule } from './apoyo-social-routing.module';

import { ApoyoSocialPage } from './apoyo-social.page';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApoyoSocialPageRoutingModule,
    SharedModule
  ],
  declarations: [ApoyoSocialPage]
})
export class ApoyoSocialPageModule {}
