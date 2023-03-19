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


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild(IonModal) modalInfo: IonModal | undefined;

  showPassword = false;
  passInputType = 'password';
  type: string = "";
  RegisterForm:FormGroup;

  constructor(
    private ar : ActivatedRoute,
    private router : Router,
    private sessionS : SesionControlService
  ) {
    this.ar.params.subscribe(
      (_url:any)=>{
        this.type = _url.type;
        // console.log(_url.userType);
      }
    )

    this.RegisterForm = this.registerFormGroup();

  }

  ngOnInit() {
  }

  registerFormGroup(){
    return new FormGroup({
      nombre: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
      ]),
      apellido_P: new FormControl(null, [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(5),
      ]),
      apellido_M: new FormControl(null, [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(5),
      ]),
      edad: new FormControl(null, [
          Validators.required,
          Validators.max(80),
          Validators.min(18),
        ]),
      colonia: new FormControl(null, [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(5),
        ]),
      calle: new FormControl(null, [
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(5),
      ]),
      no_Casa: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000),
      ]),
      CP: new FormControl(null, [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(5),
      ]),
      telefono: new FormControl(null, [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(10),
      ]),
      correo: new FormControl(null, [
        Validators.required,
        Validators.maxLength(40),
        Validators.email,
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(5),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(8),
      ]),
      // passwordValidation: new FormControl(null, [
      //   Validators.required,
      //   Validators.maxLength(16),
      //   Validators.minLength(8),
      //   MyValidations.correctPass(this.passConfim_Ing, this.pass_Ing),
      // ]),

      // Valores por Default
      foto_Perfil: new FormControl('https://picsum.photos/seed/picsum/200/200'),
      cuy_Puntos: new FormControl(0),

    });
  }

  register(){
    console.log(this.RegisterForm.value);

    this.sessionS.register_EmailPassword(this.RegisterForm.get('correo')?.value, this.RegisterForm.get('password')?.value)
    .then(response => {
      console.log(response);
      this.router.navigate(['./login'])
    })
    .catch((error: any) => console.log(error)
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
