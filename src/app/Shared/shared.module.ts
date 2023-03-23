import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { HeaderWithoutMenuComponent } from './header-without-menu/header-without-menu.component';
import { SideNavComponent } from './side-nav/side-nav.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderWithoutMenuComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    HeaderComponent,
    HeaderWithoutMenuComponent,
    SideNavComponent
  ]
})
export class SharedModule { }
