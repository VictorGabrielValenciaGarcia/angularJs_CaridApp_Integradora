import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import Avatar from 'src/app/Interfaces/Avatar.interface';
import Usuario from 'src/app/Interfaces/Usuario.interface';
import { AlertsToastServiceService } from 'src/app/Services/alerts-toast-service.service';
import { SesionControlService } from 'src/app/Services/sesion-control.service';
import { UserControlService } from 'src/app/Services/user-control.service';

@Component({
  selector: 'app-cuy-card',
  templateUrl: './cuy-card.component.html',
  styleUrls: ['./cuy-card.component.scss'],
})
export class CuyCardComponent implements OnInit {

  @Input() cuy!:Avatar;
  @Input() isMine : boolean = false;

  user !: Usuario;

  constructor(
    private router : Router,
    private alertC : AlertController,
    private asc:ActionSheetController,
    private userS  : UserControlService,
    private sesionS  : SesionControlService,
    private alertS : AlertsToastServiceService,
  ) {
    this.userS.getUser(this.sesionS.getCurrenUser()).subscribe(
      (_user : any) => {
        this.user = _user;
    });
  }

  ngOnInit() {}

  async myAvatarInteraction(){
    const acs = await this.asc.create({
      header: '- '+this.cuy.strNombre_Avatar+' -',
      subHeader : '- '+this.cuy.strDescripcion_Avatar+' -',
      mode: 'ios',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Equipar',
          icon: 'cloud-upload',
          handler: () => {
            this.setProfilePicture();
          }
        },
        {
          text: 'Cancelar',
          role:'cancel',
          icon: 'close',
        },
      ]
    })
    await acs.present();
  }

  async avatarInteraction(){
    const acs = await this.asc.create({
      header: '- '+this.cuy.strNombre_Avatar+' -',
      subHeader : '- '+this.cuy.strDescripcion_Avatar+' -',
      mode: 'ios',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Comprar',
          icon: 'bag-add',
          handler: () => {
            this.buyAvatar();
          }
        },
        {
          text: 'Cancelar',
          role:'cancel',
          icon: 'close',
        },

      ]
    })
    await acs.present();
  }

  setProfilePicture(){

    let newDataUSer = this.user;
    // newDataUSer.arrAvatares != newDataUSer.arrAvatares?.push(this.cuy.id!);
    newDataUSer.strFoto_Perfil = this.cuy.strImagen_Avatar;

    this.userS.updateUSer(newDataUSer, newDataUSer.uid!)
    this.alertS.updateUserSucces();
  }

  buyAvatar(){

    let newDataUSer = this.user;
    let cuyPrice = this.cuy.numPrecio_Avatar;
    let moneyExchange = newDataUSer.numCuy_Puntos_Usuario! - cuyPrice!;
    let isEnoughtMoney = moneyExchange >= 0;

    if(isEnoughtMoney){
      this.alertS.confirm('Comprar','¿Deseas añadir a ' + this.cuy.strNombre_Avatar + ' a tu colección?').then(
        async (resp:any) => {
          if(resp.data === true){

            newDataUSer.numCuy_Puntos_Usuario = moneyExchange;
            newDataUSer.arrAvatares != newDataUSer.arrAvatares?.push(this.cuy.id!);
            this.userS.updateUSer(newDataUSer, newDataUSer.uid!)
            this.alertS.updateUserSucces();
            // this.router.navigate(['/cuy-shop']);

          }
        }
      );

    }else{
      moneyExchange = moneyExchange * -1;
      this.notEnoghtMoney(moneyExchange);
    }
  }

  async notEnoghtMoney(_money : number) {
    const alert = await this.alertC.create({
      backdropDismiss: false,
      mode: 'ios',
      header: 'Puntos Insuficientes',
      subHeader: 'Lo sentimos necesita ' + _money + ' puntos para poder comprar este Avatar',
      translucent:true,
      buttons: [
        {
          text: 'Aceptar',
          role: 'confirm',
        },
      ]
    });
    await alert.present();
  }
}
