import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignsMenuPage } from './campaigns-menu.page';

const routes: Routes = [
  {
    path: 'campaigns',
    component: CampaignsMenuPage,
    children : [

      {
        path: 'desastres-naturales',
        loadChildren: () => import('../Campaigns/desastres-naturales/desastres-naturales.module').then( m => m.DesastresNaturalesPageModule)
      },
      {
        path: 'apoyo-social',
        loadChildren: () => import('../Campaigns/apoyo-social/apoyo-social.module').then( m => m.ApoyoSocialPageModule)
      },
      {
        path: 'animales',
        loadChildren: () => import('../Campaigns/animales/animales.module').then( m => m.AnimalesPageModule)
      },
      {
        path: '**',
        redirectTo: '/campaigns/desastres-naturales',
        pathMatch: 'full'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignsMenuPageRoutingModule {}
