import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsToastServiceService {

  constructor(
    private toastC: ToastController,
    private alertC : AlertController,
    private loadCtrl : LoadingController
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
    mode : 'ios',
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

  async loginSuccess(_userName : string){//Creamos un  parametro de tipo string
    const toast = await this.toastC.create({
      message: 'Bienvenid@ ' + _userName + '!!!',
      duration: 3000,
      position: 'top',
      color:'success',
      icon: 'happy-outline'
    });

    toast.present();
  }

  async logOutSuccess(){//Creamos un  parametro de tipo string
    const toast = await this.toastC.create({
      message: 'La sesión ha sido cerrada con Éxito!',
      duration: 3000,
      position: 'top',
      color:'tertiary',
      icon: 'log-out'
    });

    toast.present();
  }

  async registerSuccess(){//Creamos un  parametro de tipo string
    const toast = await this.toastC.create({
      message: 'Te has registrado de manera exitosa!!!',
      duration: 3000,
      position: 'top',
      color:'success',
      icon: 'happy-outline'
    });

    toast.present();
  }

  async presentLoading(_msn:string){

    const loading  = await this.loadCtrl.create({
      message: _msn,
      translucent:true,
      spinner:'bubbles',
      backdropDismiss : false,
    })

    await loading.present();
  }

  closeLoading(){
    this.loadCtrl.dismiss();
  }

}
