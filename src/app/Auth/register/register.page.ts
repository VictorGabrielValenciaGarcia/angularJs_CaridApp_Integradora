/**
 * https://forum.ionicframework.com/t/ionic-5-hide-scrollbar-on-ion-content/188570/5
 * https://ionicframework.com/docs/api/modal
 *
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SesionControlService } from 'src/app/Services/sesion-control.service';
import Usuario from '../../Interfaces/Usuario.interface';
import { RegexServiceService } from 'src/app/Services/regex-service.service';
import { UserControlService } from 'src/app/Services/user-control.service';
import { AlertsToastServiceService } from 'src/app/Services/alerts-toast-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild(IonModal) modalInfo: IonModal | undefined;

  dataUser : Usuario = {

    uid : '',
    rotullus : 'Carid-User',

    mapNombre : {
      strNombre : '',
      strApellido_Paterno : '',
      strApellido_Materno : '',
    },

    strFoto_Perfil : '',
    strPassword : '',
    strUsername : '',
    strCorreo : '',
    strTelefono : '',

    numEdad_Usuario : 0,

    mapDireccion_Usuario :{
      strColonia : '',
      strCalle : '',
      numNumero_Casa : 0,
      numCP : '',
    },

    numCuy_Puntos_Usuario : 0,
  }

  showPassword = false;
  passInputType = 'password';
  type: string = "";
  RegisterUserForm:FormGroup;

  constructor(
    private ar : ActivatedRoute,
    private router : Router,
    private sessionS : SesionControlService,
    private userCS : UserControlService,
    private regex : RegexServiceService,
    private alertS : AlertsToastServiceService,
  ) {
    this.ar.params.subscribe(
      (_url:any)=>{
        this.type = _url.type;
        // console.log(_url.userType);
      }
    )

    this.RegisterUserForm = this.registerUserFormGroup();

  }

  ngOnInit() {
  }

  registerUserFormGroup(){
    return new FormGroup({
      strNombre: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(3),
        Validators.pattern(this.regex.lt_sp),
      ]),
      strApellido_Paterno: new FormControl(null, [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(3),
        Validators.pattern(this.regex.lt_sp),
      ]),
      strApellido_Materno: new FormControl(null, [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(3),
        Validators.pattern(this.regex.lt_sp),
      ]),
      numEdad_Usuario: new FormControl(null, [
          Validators.required,
          Validators.max(80),
          Validators.min(18),
          Validators.pattern(this.regex.ptIntNum),
        ]),
      strColonia: new FormControl(null, [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(5),
          Validators.pattern(this.regex.lt_sp_dt),
        ]),
      strCalle: new FormControl(null, [
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern(this.regex.lt_num_sp),
      ]),
      numNumero_Casa: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000),
        Validators.pattern(this.regex.ptIntNum),
      ]),
      numCP: new FormControl(null, [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(5),
        Validators.pattern(this.regex.ptIntNum),
      ]),
      strTelefono: new FormControl(null, [
        Validators.required,
        Validators.maxLength(18),
        Validators.minLength(10),
        Validators.pattern(this.regex.phone),
      ]),
      strCorreo: new FormControl(null, [
        Validators.required,
        Validators.maxLength(40),
        Validators.email,
      ]),
      strUsername: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(5),
        Validators.pattern(this.regex.lt_num_sp_us),
      ]),
      strPassword: new FormControl("", [
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(8),
      ]),

      // Valores por Default
      strFoto_Perfil: new FormControl('https://picsum.photos/seed/picsum/200/200'),
      numCuy_Puntos_Usuario: new FormControl(0),

    });
  }

  async registerUser(){

  // console.log(this.RegisterUserForm.value);
  this.alertS.presentLoading('Procesando Registro..')

  this.dataUser = {

    rotullus : 'Carid-User',
    mapNombre : {
      strNombre : this.RegisterUserForm.get('strNombre')?.value,
      strApellido_Paterno : this.RegisterUserForm.get('strApellido_Paterno')?.value,
      strApellido_Materno : this.RegisterUserForm.get('strApellido_Materno')?.value,
    },
    strFoto_Perfil : this.RegisterUserForm.get('strFoto_Perfil')?.value,
    strPassword : this.RegisterUserForm.get('strPassword')?.value,
    strUsername : this.RegisterUserForm.get('strUsername')?.value,
    strCorreo : this.RegisterUserForm.get('strCorreo')?.value,
    strTelefono : this.RegisterUserForm.get('strTelefono')?.value,
    numEdad_Usuario : this.RegisterUserForm.get('numEdad_Usuario')?.value,
    mapDireccion_Usuario :{
      strColonia : this.RegisterUserForm.get('strColonia')?.value,
      strCalle : this.RegisterUserForm.get('strCalle')?.value,
      numNumero_Casa : this.RegisterUserForm.get('numNumero_Casa')?.value,
      numCP : this.RegisterUserForm.get('numCP')?.value,
    },
    numCuy_Puntos_Usuario : 0,
  }

  // console.log(this.dataUser);

  const response = await this.sessionS.register_EmailPassword_User(this.dataUser)
    .then(async response => {
      // console.log(response);
      const id = response.user.uid;
      this.dataUser.uid = id;
      this.dataUser.strPassword = "";

      await this.userCS.addUser(this.dataUser, id)
      this.alertS.registerSuccess();

      this.alertS.closeLoading()
      this.router.navigate(['./login'])

    })
    .catch((error: any) => {console.log(error); this.alertS.closeLoading()}
    );
  }

  // Elementos

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

}
