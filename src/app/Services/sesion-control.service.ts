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
import { signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { setPersistence, browserLocalPersistence } from '@firebase/auth'
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';

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

  async logIn(_email: any, _password: any) {


    // return signInWithEmailAndPassword(this.authC , _email, _password);

    return setPersistence(this.authC , browserLocalPersistence).then(() => {
      return signInWithEmailAndPassword(this.authC , _email, _password);
    }).catch((error) => {
      return Promise.reject(error);
    });
  }

  // Login con google
  logInWithGoogle() {
    return signInWithPopup(this.authC , new GoogleAuthProvider());
  }

  logOut() {
    this.alertS.logOutSuccess();
    return signOut(this.authC);
  }

  // Añade al usuario a las cuentas para hacer login
  register_EmailPassword_User(_UserData : Usuario) {
    return createUserWithEmailAndPassword(this.authC , _UserData.strCorreo, _UserData.strPassword)
  }

  async userState(){
    let user : any;
    await this.authC.onAuthStateChanged(
      _user => {
        // console.log(user);
        user = _user?.uid;
      }
    );
    return user;
  }

}
