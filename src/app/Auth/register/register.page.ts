/**
 * https://forum.ionicframework.com/t/ionic-5-hide-scrollbar-on-ion-content/188570/5
 * https://ionicframework.com/docs/api/modal
 *
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
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

  dataInst : Usuario = {

    uid : '',
    rotullus : 'Carid-Inst',

    strFoto_Perfil : '',
    strPassword : '',
    strUsername : '',
    strCorreo : '',
    strTelefono : '',
    arrCentros_Acopio_Institucion : [],
    arrCorreos_Institucion : [
      {
        strCorreo_Departamento : '',
        strDepartamento : '',
        strEncargado_Departamento : '',
        strTelefono_Departamento : '',
      }
    ],
    boolVerificado_Institucion: false,
    mapRedes_Sociales_Institucion : {
      strFacebook : "",
      strInstagram : "",
      strTwitter : "",
    },
    strNombre_Institucion : '',
    strRFC_Institucion : '',
  }

  // Password Toggle
  showPassword = false;
  passInputType = 'password';

  // Register Manage
  type: string = "";
  RegisterUserForm:FormGroup;
  RegisterInstForm:FormGroup;

  constructor(
    private router : Router,
    private ar : ActivatedRoute,
    private formB : FormBuilder,
    private userCS : UserControlService,
    private regex : RegexServiceService,
    private sessionS : SesionControlService,
    private alertS : AlertsToastServiceService,
  ) {
    this.ar.params.subscribe(
      (_url:any)=>{
        this.type = _url.type;
        // console.log(_url.userType);
      }
    )

    this.RegisterUserForm = this.registerUserFormGroup();

    this.RegisterInstForm = this.formB.group({

      strNombre_Institucion: ['', [
        Validators.required,
        Validators.pattern(this.regex.lt_num_sp_us_dt),
      ]],
      strRFC_Institucion: ['', [
        Validators.required,
        Validators.pattern(this.regex.rfc),
      ]],
      strFacebook: ['Ninguno',[
        Validators.pattern(this.regex.lt_num_sp_us_arr),
      ]],
      strInstagram: ['Ninguno', [
        Validators.pattern(this.regex.lt_num_sp_us_arr),
      ]],
      strTwitter: ['Ninguno', [
        Validators.pattern(this.regex.lt_num_sp_us_arr),
      ]],

      arrCorreos_Institucion : this.formB.array([
        this.formB.group({
          strCorreo_Departamento: ['', [
            Validators.required,
            Validators.email,
          ]],
          strDepartamento: ['', [
            Validators.required,
            Validators.pattern(this.regex.lt_sp_dt),
          ]],
          strEncargado_Departamento: ['', [
            Validators.required,
            Validators.pattern(this.regex.lt_sp_dt),
          ]],
          strTelefono_Departamento: ['', [
            Validators.required,
            Validators.pattern(this.regex.phone),
          ]],
        })
      ]),

      strTelefono: ['', [
        Validators.required,
        Validators.maxLength(18),
        Validators.minLength(10),
        Validators.pattern(this.regex.phone),
      ]],
      strCorreo: ['', [
        Validators.required,
        Validators.maxLength(40),
        Validators.email,
      ]],
      strUsername: ["", [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(5),
        Validators.pattern(this.regex.lt_num_sp_us),
      ]],
      strPassword: ["", [
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(8),
      ]],
    });
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

  async registerInst(){

    // console.log(this.RegisterInstForm.value);
    this.alertS.presentLoading('Procesando Registro..')

    this.dataInst = {

      // Default Values
      rotullus : 'Carid-Inst',
      strFoto_Perfil : 'https://picsum.photos/seed/picsum/200/200',
      arrCentros_Acopio_Institucion : [],
      boolVerificado_Institucion: false,

      // Third Slide
      strPassword : this.RegisterInstForm.get('strPassword')?.value,
      strUsername : this.RegisterInstForm.get('strUsername')?.value,
      strCorreo : this.RegisterInstForm.get('strCorreo')?.value,
      strTelefono : this.RegisterInstForm.get('strTelefono')?.value,

      // Second Slide
      arrCorreos_Institucion : this.RegisterInstForm.get('arrCorreos_Institucion')?.value,

      // First Slide
      mapRedes_Sociales_Institucion : {
        strFacebook : this.RegisterInstForm.get('strFacebook')?.value,
        strInstagram : this.RegisterInstForm.get('strInstagram')?.value,
        strTwitter : this.RegisterInstForm.get('strTwitter')?.value,
      },
      strNombre_Institucion : this.RegisterInstForm.get('strNombre_Institucion')?.value,
      strRFC_Institucion : this.RegisterInstForm.get('strRFC_Institucion')?.value,
    }

    console.log(this.dataInst);

    const response = await this.sessionS.register_EmailPassword_User(this.dataInst)
      .then(async response => {
        // console.log(response);
        const id = response.user.uid;
        this.dataInst.uid = id;
        this.dataInst.strPassword = "";

        await this.userCS.addUser(this.dataInst, id)
        this.alertS.registerSuccess();

        this.alertS.closeLoading()
        this.router.navigate(['./login'])

      })
      .catch((error: any) => {console.log(error); this.alertS.closeLoading()}
      );
  }

  // Array Form

  get arrCorreos_Institucion(){
    return this.RegisterInstForm.get('arrCorreos_Institucion') as FormArray;
  }

  addNewInputFieldCorreo() {
    this.arrCorreos_Institucion.push(
      this.formB.group({
        strCorreo_Departamento: ['', [
          Validators.required,
          Validators.email,
        ]],
        strDepartamento: ['', [
          Validators.required,
          Validators.pattern(this.regex.lt_sp_dt),
        ]],
        strEncargado_Departamento: ['', [
          Validators.required,
          Validators.pattern(this.regex.lt_sp_dt),
        ]],
        strTelefono_Departamento: ['', [
          Validators.required,
          Validators.pattern(this.regex.phone),
        ]],
      })
    )
  }

  removeInputFieldCorreo(_id : number) {
    this.arrCorreos_Institucion.removeAt(_id);
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
