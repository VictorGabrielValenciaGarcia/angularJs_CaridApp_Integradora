import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./campaigns-menu/campaigns-menu.module').then( m => m.CampaignsMenuPageModule),
    // ...canActivate(()=>redirectUnauthorizedTo(['./login']))

  },
  {
    path: 'login',
    loadChildren: () => import('./Auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register/:type',
    loadChildren: () => import('./Auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./Auth/settings/settings.module').then( m => m.SettingsPageModule),
    // ...canActivate(()=>redirectUnauthorizedTo(['./login']))
  },
  {
    path: 'campaign/:id',
    loadChildren: () => import('./Campaigns/campaign/campaign.module').then( m => m.CampaignPageModule)
  },
  {
    path: 'centers-map/:id',
    loadChildren: () => import('./Campaigns/centers-map/centers-map.module').then( m => m.CentersMapPageModule)
  },
  {
    path: 'dashboard/:type',
    loadChildren: () => import('./Instituciones/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'mi-campaigns',
    loadChildren: () => import('./Instituciones/mi-campaigns/mi-campaigns.module').then( m => m.MiCampaignsPageModule)
  },
  {
    path: 'mi-centers',
    loadChildren: () => import('./Instituciones/mi-centers/mi-centers.module').then( m => m.MiCentersPageModule)
  },
  {
    path: 'center-details/:id',
    loadChildren: () => import('./Instituciones/center-details/center-details.module').then( m => m.CenterDetailsPageModule)
  },
  {
    path: 'create-center',
    loadChildren: () => import('./Instituciones/create-center/create-center.module').then( m => m.CreateCenterPageModule)
  },
  // {
  //   path: 'create-center',
  //   loadChildren: () => import('./Instituciones/create-center/create-center.module').then( m => m.CreateCenterPageModule)
  // },

  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
