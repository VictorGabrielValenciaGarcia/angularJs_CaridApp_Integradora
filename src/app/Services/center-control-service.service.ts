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
