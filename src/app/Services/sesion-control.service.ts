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
import { Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class SesionControlService {

  constructor(
    private auth: Auth,
  ) { }

  logIn(_email: any, _password: any) {
    return signInWithEmailAndPassword(this.auth, _email, _password);
  }
  // Login con google
  logInWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  logOut() {
    return signOut(this.auth);
  }

  // Añade al usuario a las cuentas para hacer login
  register_EmailPassword(_email: any, _password: any) {
    return createUserWithEmailAndPassword(this.auth, _email, _password)
  }

}
