import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { canActivate, redirectUnauthorizedTo, loggedIn, redirectLoggedInTo } from '@angular/fire/auth-guard';

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
    loadChildren: () => import('./Auth/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'register/:type',
    loadChildren: () => import('./Auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./Auth/settings/settings.module').then( m => m.SettingsPageModule),
    ...canActivate(()=>redirectUnauthorizedTo(['./login']))
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
    loadChildren: () => import('./Instituciones/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    // ...canActivate(()=>redirectUnauthorizedTo(['./login']))
  },
  {
    path: 'mi-campaigns',
    loadChildren: () => import('./Instituciones/Campaigns/mi-campaigns/mi-campaigns.module').then( m => m.MiCampaignsPageModule),
    // ...canActivate(()=>redirectUnauthorizedTo(['./login']))
  },
  {
    path: 'mi-centers',
    loadChildren: () => import('./Instituciones/Centers/mi-centers/mi-centers.module').then( m => m.MiCentersPageModule),
    ...canActivate(()=>redirectUnauthorizedTo(['./login']))
  },
  {
    path: 'center-details/:id',
    loadChildren: () => import('./Instituciones/Centers/center-details/center-details.module').then( m => m.CenterDetailsPageModule),
    ...canActivate(()=>redirectUnauthorizedTo(['./login']))
  },
  {
    path: 'create-center',
    loadChildren: () => import('./Instituciones/Centers/create-center/create-center.module').then( m => m.CreateCenterPageModule),
    ...canActivate(()=>redirectUnauthorizedTo(['./login']))
  },
  {
    path: 'create-center/:id',
    loadChildren: () => import('./Instituciones/Centers/create-center/create-center.module').then( m => m.CreateCenterPageModule),
    ...canActivate(()=>redirectUnauthorizedTo(['./login']))
  },
  {
    path: 'create-campaigns',
    loadChildren: () => import('./Instituciones/Campaigns/create-campaigns/create-campaigns.module').then( m => m.CreateCampaignsPageModule),
    // ...canActivate(()=>redirectUnauthorizedTo(['./login']))
  },
  // {
  //   path: 'create-campaigns/:id',
  //   loadChildren: () => import('./Instituciones/Campaigns/create-campaigns/create-campaigns.module').then( m => m.CreateCampaignsPageModule)
  // },
  {
    path: 'campaign-details',
    loadChildren: () => import('./Instituciones/Campaigns/campaign-details/campaign-details.module').then( m => m.CampaignDetailsPageModule),
    // ...canActivate(()=>redirectUnauthorizedTo(['./login']))
  },

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
