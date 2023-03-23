import { Component, OnInit } from '@angular/core';
import { SesionControlService } from 'src/app/Services/sesion-control.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {

  constructor(
    private sessionS: SesionControlService
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.sessionS.logOut();
  }

}
