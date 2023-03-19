import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  @ViewChild(IonModal) modalInfo: IonModal | undefined;

  // content : string = 'settings-personal';
  content : string = 'settings-profile';
  showPassword = false;
  passInputType = 'password';


  constructor() { }

  ngOnInit() {
  }

  showContent(_contentType : string){
    this.content = _contentType;
    console.log(this.content);
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} carácteres disponibles`;
  }

    toggleShow() {
    this.showPassword = !this.showPassword;

    if (this.passInputType === 'password') {
      this.passInputType = 'text'
    } else {
      this.passInputType = 'password'
    }
  }

  showChangePass(){
    this.modalInfo?.present()
  }

}

/*
  Personal
    Nombre
    Apellido_Paterno
    Apellido_Materno
    Edad
    Telefono

  Direccion
    Colonia
    Calle
    Numero_Casa
    CP

  Cuenta
    Correo
    Username
    Password
    Cuy_Puntos
*/
