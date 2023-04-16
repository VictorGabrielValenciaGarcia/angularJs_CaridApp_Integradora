import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuyShopPage } from './cuy-shop.page';

const routes: Routes = [
  {
    path: '',
    component: CuyShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuyShopPageRoutingModule {}
