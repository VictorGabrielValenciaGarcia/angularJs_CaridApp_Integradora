import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsToastServiceService {

  constructor(
    private toastC: ToastController,
    private alertC : AlertController,
  ) { }


  async successToast(_msn:string){//Creamos un  parametro de tipo string
    const toast = await this.toastC.create({
      message: 'El registro se ha agregado a ' + _msn + ' correctamente',
      duration: 3000,
      position: 'top',
      color:'success',
      icon: 'checkmark-done-outline'
    });

    toast.present();
  }

  async deleteToast(_msn:string){//Creamos un  parametro de tipo string
    const toast = await this.toastC.create({
      message: 'El registro se ha eliminado de ' + _msn + ' correctamente',
      duration: 3000,
      position: 'top',
      color:'danger',
      icon: 'close-circle-outline'
    });

    toast.present();
  }

  async updateToast(_msn:string){//Creamos un  parametro de tipo string
    const toast = await this.toastC.create({
      message: 'Se ha actualizado a ' + _msn + ' correctamente',
      duration: 3000,
      position: 'top',
      color:'primary',
      icon: 'cloud-done-outline'
    });

    toast.present();
  }

  async confirm(_msn : string, _title: string){
  let choice;

  const alert = await this.alertC.create({
    header : _title,
    subHeader : _msn,
    buttons : [
      {
        text : 'Aceptar',
        role : 'confirm',
        handler : ()=> {
          alert.dismiss(true);
          return false;
        }
      },
      {
        text : 'Cancelar',
        role : 'cancel',
        handler : ()=> {
          alert.dismiss(false);
          return false;
        }
      },
    ]
  });

  await alert.present();

  await alert.onDidDismiss().then(
    (data:any) =>{
      choice = data;
    }
  );

  return choice;
  }

}
