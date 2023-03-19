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
