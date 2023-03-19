import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { SesionControlService } from 'src/app/Services/sesion-control.service';
// import { SesionControlService } from 'src/app/Services/sesion-control.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any = []
  showPassword = false;
  passInputType = 'password';

  @ViewChild(IonModal) modal: IonModal | undefined;

  constructor(
    private sessionS: SesionControlService,
    private router: Router,
    private alertC : AlertController
  ) {this.FormLogin = this.FormLoginGroup(); }

  ngOnInit() {
  }

  FormLogin:FormGroup;

  FormLoginGroup(){
    return  new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.maxLength(40),
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(8),
      ]),
    });
  }

  logIn(){
    console.log(this.FormLogin.value);

    this.sessionS.logIn(this.FormLogin.get('correo')?.value, this.FormLogin.get('contraseña')?.value).then(response => {
      this.router.navigate(['./campaigns/animales']);
      this.user = response;
      // console.log(this.user);
      // console.log(this.user._tokenResponse);


    })
    .catch(error => {
      this.LogueoFallido();
      // console.log(error);
    });
  }

  logInWithGoogle() {
    this.sessionS.logInWithGoogle()
    .then(response => {
      this.router.navigate(['./campaigns/animales']);
      this.user = response
      // console.log(this.user);
    })
    .catch(error => {
      // this.LogueoFallido();
      console.log(error);
    })
  }


  // Elementos

  register(tipo:string){
    this.router.navigate(['register',tipo]);
    this.modal?.dismiss();
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

  async LogueoFallido() {
    const alert = await this.alertC.create({
      backdropDismiss: false,
      mode: 'ios',
      header: 'Error de Logueo',
      subHeader: 'La cuenta ingresada no existe!',
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
