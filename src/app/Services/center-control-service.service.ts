import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData, setDoc } from '@angular/fire/firestore';
import { addDoc, collection, doc, deleteDoc, updateDoc } from '@firebase/firestore';
import CentroAcopio from '../Interfaces/CentroAcopio.interface';
import { Observable } from 'rxjs';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class CenterControlServiceService {

  constructor(
    private firestore : Firestore,
  ) { }

  // Centers CRUD

  addCenter(_center : CentroAcopio){
    const centerRef = collection(this.firestore, 'CaridApp_CentrosAcopio');
    return addDoc(centerRef, _center);
  }

  getCenters() : Observable <CentroAcopio[]>{
    const centerRef = collection(this.firestore, 'CaridApp_CentrosAcopio');
    return collectionData(centerRef,{idField:'id'}) as Observable<CentroAcopio[]>;
  }

  getCenterById(_id : string): Observable <CentroAcopio> {
    const centerRef = doc(this.firestore, `CaridApp_CentrosAcopio/${_id}`);
    return docData(centerRef, { idField: 'id' }) as Observable<CentroAcopio>;
  }

  // updateCenter(_center : CentroAcopio) {

  //   const centerRef = doc(this.firestore, `CaridApp_CentrosAcopio/${_center.id}`);
  //   // console.log(centerRef);

  //   return updateDoc(centerRef,
  //     {

  //       strNombre_CentroA: _center.strNombre_CentroA,
  //       strImage_CentroA:_center.strImage_CentroA,
  //       numId_Institucion : _center.numId_Institucion,

  //       mapContactos_CentroA : {
  //         arrCorreos_CentroA : _center.mapContactos_CentroA.arrCorreos_CentroA,
  //         strFacebook : _center.mapContactos_CentroA.strFacebook,
  //         strInstagram : _center.mapContactos_CentroA.strInstagram,
  //         strTelefono : _center.mapContactos_CentroA.strTelefono,
  //         strTikTok : _center.mapContactos_CentroA.strTikTok,
  //         strTwitter : _center.mapContactos_CentroA.strTwitter,
  //         strWhatsApp : _center.mapContactos_CentroA.strWhatsApp,
  //       },

  //       mapDireccion_Fisica_CentroA :{
  //         numCP:_center.mapDireccion_Fisica_CentroA.numCP,
  //         numNumero_Exterior:_center.mapDireccion_Fisica_CentroA.numNumero_Exterior,
  //         numNumero_Interior:_center.mapDireccion_Fisica_CentroA.numNumero_Interior,
  //         strCalle:_center.mapDireccion_Fisica_CentroA.strCalle,
  //         strCiudad:_center.mapDireccion_Fisica_CentroA.strCiudad,
  //         strColonia:_center.mapDireccion_Fisica_CentroA.strColonia,
  //         strEstado:_center.mapDireccion_Fisica_CentroA.strEstado,
  //         strMunicipio:_center.mapDireccion_Fisica_CentroA.strMunicipio,
  //       },

  //       mapDireccion_GPS_CentroA :{
  //         longitud:_center.mapDireccion_GPS_CentroA.longitud,
  //         latitud:_center.mapDireccion_GPS_CentroA.latitud,
  //       },

  //     }
  //   );
  // }

  updateCenter(_center: CentroAcopio, _id : string) {
    console.log(_center);
    console.log(_id);

    const document = doc(this.firestore, `CaridApp_CentrosAcopio/${_id}`);
    const { id, ...data } = _center; // we don't want to save the id inside the document
    return setDoc(document, data);
  }

  deleteCenter(_center : CentroAcopio){
    const centerDocRef = doc(this.firestore, `CaridApp_CentrosAcopio/${_center.id}`);
    return deleteDoc(centerDocRef);
  }

}
