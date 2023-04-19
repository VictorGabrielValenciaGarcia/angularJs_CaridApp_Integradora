/*
* session-control.service.ts
* v0.0.0.1
*
* Fecha de Creación: 28 / 02 / 2023
* Fecha de Modificación: -- / -- / --
*
* @Víctor Gabriel Valencia García
*
* El presente servicio está a cargo de controlar todas las acciones basicas correspondientes al
* manejo y control de las sesiones...
*
* Recursos Obtenidos de:
* - FireBase - FireStore firebase-caridapp-int2023
*/

import { Injectable } from '@angular/core';
import {Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, getAuth, onAuthStateChanged} from '@angular/fire/auth';

import Usuario from '../Interfaces/Usuario.interface';
import { AlertsToastServiceService } from './alerts-toast-service.service';

@Injectable({
  providedIn: 'root'
})
export class SesionControlService {

  constructor(
    private readonly authC : Auth,
    private alertS : AlertsToastServiceService,
  ) {
  }

  // Session Cycle

  async logIn(_email: any, _password: any) {
    return signInWithEmailAndPassword(this.authC , _email, _password);
  }

  logOut() {
    this.alertS.logOutSuccess();
    return signOut(this.authC);
  }

  // Register
  register_EmailPassword_User(_UserData : Usuario) {
    return createUserWithEmailAndPassword(this.authC , _UserData.strCorreo, _UserData.strPassword)
  }

  // Session Live
  getCurrenUser() : string{
    let user : any = getAuth().currentUser?.uid;
    // console.log(user);
    return user;
  }

}
