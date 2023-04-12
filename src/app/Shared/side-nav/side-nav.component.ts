import { Component, OnInit } from '@angular/core';
import { SesionControlService } from 'src/app/Services/sesion-control.service';

import { Router } from '@angular/router';
import { AlertsToastServiceService } from 'src/app/Services/alerts-toast-service.service';
import { UserControlService } from 'src/app/Services/user-control.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {

  isLogin : boolean = false;
  userID : string = '';

  // User Data
  username : string = '';
  points : number = 0;
  email : string = '';
  role : string = '';


  constructor(
    private sesion: SesionControlService,
    private userS: UserControlService,
    private router : Router,
    private alertS : AlertsToastServiceService,
  ) {
    this.sesion.userState().then(
      resp => {
        // console.log(resp);
        if(resp !== undefined){
          this.isLogin = true;
          console.log(this.isLogin);
          this.getUserData(resp);
        }
      }
    )
  }

  ngOnInit() {
  }

  logOut() {
    this.sesion.logOut();
    this.router.navigate(['/login']);
    this.alertS.logOutSuccess();
  }

  goToRoute(_route : string){
    this.router.navigate(['_route'])
  }

  getUserData(_uid : string){
    this.userS.getUser(_uid).subscribe(
      _user => {
        this.username = _user.strUsername;
        this.points != _user.numCuy_Puntos_Usuario;
        this.email = _user.strCorreo;
        this.role = _user.rotullus;
      }
    )
  }

}
