import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import CentroAcopio from 'src/app/Interfaces/CentroAcopio.interface';
import Usuario from 'src/app/Interfaces/Usuario.interface';
import { CenterControlServiceService } from 'src/app/Services/center-control-service.service';
import { SesionControlService } from 'src/app/Services/sesion-control.service';
import { UserControlService } from 'src/app/Services/user-control.service';

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
  centrosInst : CentroAcopio[] = []

  user : Usuario = {
    rotullus : 'Carid-Admin',
    strCorreo : '',
    strTelefono : '',
    strPassword : '',
    strUsername : '',
    strFoto_Perfil : '',
  }

  constructor(
    private userS : UserControlService,
    private sesionS : SesionControlService,
    private centroS : CenterControlServiceService,
  ) {
    this.userS.getUser(this.sesionS.getCurrenUser()).subscribe(
      (_user : any) => {
        this.user = _user;
        if(_user.rotullus = 'Carid-Inst'){
          _user.arrCentros_Acopio_Institucion.forEach((centroID:any) => {
            this.centroS.getCenterById(centroID).subscribe(
              _centro => {
                this.centrosInst.push(_centro);
              }
            )
          });
        }
      }
    );
  }

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
