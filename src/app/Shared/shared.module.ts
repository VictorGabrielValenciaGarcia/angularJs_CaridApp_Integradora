import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { HeaderWithoutMenuComponent } from './header-without-menu/header-without-menu.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderWithoutMenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    HeaderComponent,
    HeaderWithoutMenuComponent
  ]
})
export class SharedModule { }
