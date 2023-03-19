import { Component, OnInit } from '@angular/core';
import { SesionControlService } from '../Services/sesion-control.service';

@Component({
  selector: 'app-campaigns-menu',
  templateUrl: './campaigns-menu.page.html',
  styleUrls: ['./campaigns-menu.page.scss'],
})
export class CampaignsMenuPage implements OnInit {

  constructor(
    private sessionS: SesionControlService
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.sessionS.logOut();
  }
}
