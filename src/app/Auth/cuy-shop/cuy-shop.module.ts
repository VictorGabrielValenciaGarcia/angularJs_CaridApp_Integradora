import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuyShopPageRoutingModule } from './cuy-shop-routing.module';

import { CuyShopPage } from './cuy-shop.page';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuyShopPageRoutingModule,
    SharedModule
  ],
  declarations: [CuyShopPage]
})
export class CuyShopPageModule {}
