import { Component, OnInit } from '@angular/core';
import { SesionControlService } from 'src/app/Services/sesion-control.service';

import { Router } from '@angular/router';
import { AlertsToastServiceService } from 'src/app/Services/alerts-toast-service.service';
import { UserControlService } from 'src/app/Services/user-control.service';
import Usuario from 'src/app/Interfaces/Usuario.interface';

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
  image : string = '';
  points : number = 0;
  email : string = '';
  role : string = '';


  constructor(
    private sesion: SesionControlService,
    private userS: UserControlService,
    private router : Router,
  ) {
    console.log(this.sesion.getCurrenUser());

    if(this.sesion.getCurrenUser() !== null){
      this.getUserData(this.sesion.getCurrenUser());
      this.isLogin = true;
      // console.log(this.isLogin);
    }
  }

  ngOnInit() {
  }

  logOut() {
    this.sesion.logOut();
    this.router.navigate(['/login']);
  }

  goToSetting(){
    this.router.navigate(['/settings']);
  }

  goToDashAdmin(){
    this.router.navigate(['/dashboard/carid-Admin-Role']);
  }

  goToDashInst(){
    this.router.navigate(['/dashboard/carid-Inst-Role']);
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }


  getUserData(_uid : string){
    this.userS.getUser(_uid).subscribe(
      (_user:Usuario) => {
        this.username = _user.strUsername;
        this.points != _user.numCuy_Puntos_Usuario;
        this.email = _user.strCorreo;
        this.role = _user.rotullus;
        this.image = _user.strFoto_Perfil;
      }
    )
  }

}
