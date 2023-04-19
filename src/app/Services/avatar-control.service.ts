import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData, setDoc } from '@angular/fire/firestore';
import { addDoc, collection, doc, deleteDoc, updateDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import Avatar from '../Interfaces/Avatar.interface';

@Injectable({
  providedIn: 'root'
})
export class AvatarControlService {

  constructor(
    private firestore : Firestore,
  ) { }

  // Centers CRUD

  addAvatar(_avatar : Avatar){
    const avatarRef = collection(this.firestore, 'CaridApp_Avatares');
    return addDoc(avatarRef, _avatar);
  }

  getAvatars() : Observable <Avatar[]>{
    const avatarRef = collection(this.firestore, 'CaridApp_Avatares');
    return collectionData(avatarRef,{idField:'id'}) as Observable<Avatar[]>;
  }

  getAvatarById(_id : string): Observable <Avatar> {
    const avatarRef = doc(this.firestore, `CaridApp_Avatares/${_id}`);
    return docData(avatarRef, { idField: 'id' }) as Observable<Avatar>;
  }

  updateAvatar(_avatar: Avatar, _id : string) {
    console.log(_avatar);
    console.log(_id);

    const document = doc(this.firestore, `CaridApp_Avatares/${_id}`);
    const { id, ...data } = _avatar; // we don't want to save the id inside the document
    return setDoc(document, data);
  }

  deleteAvatar(_avatar : Avatar){
    const avatarDocRef = doc(this.firestore, `CaridApp_Avatares/${_avatar.id}`);
    return deleteDoc(avatarDocRef);
  }

}
