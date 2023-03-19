/*
* user-control.service.ts
* v0.0.0.1
*
* Fecha de Creación: 28 / 02 / 2023
* Fecha de Modificación: -- / -- / --
*
* @Víctor Gabriel Valencia García
*
* El presente servicio está a cargo de controlar todas las acciones basicas correspondientes a
* la creacion,
*
* Creditos a:
* - FireBase - FireStore firebase-caridapp-int2023
*/

import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';

import { Firestore, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { addDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';

import Usuario from '../Interfaces/Usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class UserControlService {

  constructor(
    private firestore: Firestore,
    private auth: Auth,
  ) { }

  addUser(_user: any) {
    const usersRef = collection(this.firestore, 'CaridApp_Usuarios');
    return addDoc(usersRef, _user);
  }

  getUser(): Observable <Usuario[]> {
    const usersRef = collection(this.firestore, 'CaridApp_Usuarios');
    return collectionData(usersRef, {idField: 'nombre'}) as Observable<Usuario[]>
  }

  deleteUser(_user: Usuario) {
    const userDocRef = doc(this.firestore, `CaridApp_Usuarios/${_user.strUsername_Usuario}`);
    return deleteDoc(userDocRef);
  }


}
