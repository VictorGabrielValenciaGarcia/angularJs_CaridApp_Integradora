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

import { Firestore, collectionData, doc, deleteDoc, docData } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { addDoc, setDoc } from '@firebase/firestore';
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

  addUser(_user: Usuario, _id : string) {
    // const usersRef = collection(this.firestore, 'CaridApp_Usuarios');
    return setDoc(doc(this.firestore, "CaridApp_Usuarios", _id), _user);;
  }

  getUser(_id : string): Observable <Usuario> {
    const usersRef = doc(this.firestore, `CaridApp_Usuarios/${_id}`);
    return docData(usersRef, { idField: 'id' }) as Observable<Usuario>;
  }

  updateUSer(_user: Usuario, _id : string) {
    // console.log(_user);
    // console.log(_id);
    const document = doc(this.firestore, `CaridApp_Usuarios/${_id}`);
    return setDoc(document, _user);
  }

  deleteUser(_user: Usuario) {
    const userDocRef = doc(this.firestore, `CaridApp_Usuarios/${_user.uid}`);
    return deleteDoc(userDocRef);
  }


}
