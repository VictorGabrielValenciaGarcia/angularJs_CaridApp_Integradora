import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData, setDoc } from '@angular/fire/firestore';
import { addDoc, collection, doc, deleteDoc, updateDoc } from '@firebase/firestore';
import Campania from '../Interfaces/Campania.interface';
import { Observable } from 'rxjs';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class CampaignControlServiceService {

  constructor(private firestore : Firestore,) {}


  // campaign CRUD

  addCampaign(_campaign : Campania){
    const campaignRef = collection(this.firestore, 'CaridApp_Campanias');
    return addDoc(campaignRef, _campaign);
  }

  getCampaigns() : Observable <Campania[]>{
    const campaignRef = collection(this.firestore, 'CaridApp_Campanias');
    return collectionData(campaignRef,{idField:'id'}) as Observable<Campania[]>;
  }

  getCampaignById(_id : string): Observable <Campania> {
    const campaignRef = doc(this.firestore, `CaridApp_Campanias/${_id}`);
    return docData(campaignRef, { idField: 'id' }) as Observable<Campania>;
  }

  updateCampaign(_campaign: Campania, _id : string) {
    console.log(_campaign);
    console.log(_id);

    const document = doc(this.firestore, `CaridApp_Campanias/${_id}`);
    const { id, ...data } = _campaign; // we don't want to save the id inside the document
    return setDoc(document, data);
  }

  deleteCampaign(_campaign : Campania){
    const campaignDocRef = doc(this.firestore, `CaridApp_Campanias/${_campaign.id}`);
    return deleteDoc(campaignDocRef);
  }
}
