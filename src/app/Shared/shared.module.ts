import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { HeaderWithoutMenuComponent } from './header-without-menu/header-without-menu.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CampaignTicketComponent } from './campaign-ticket/campaign-ticket.component';
import { TimerComponent } from './timer/timer.component';
import { CampaignCardComponent } from './campaign-card/campaign-card.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderWithoutMenuComponent,
    SideNavComponent,
    CampaignTicketComponent,
    TimerComponent,
    CampaignCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    HeaderComponent,
    HeaderWithoutMenuComponent,
    SideNavComponent,
    CampaignTicketComponent,
    TimerComponent,
    CampaignCardComponent,
  ]
})
export class SharedModule { }
