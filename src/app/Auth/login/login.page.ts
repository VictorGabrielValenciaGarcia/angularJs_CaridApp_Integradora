import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { AlertsToastServiceService } from 'src/app/Services/alerts-toast-service.service';
import { SesionControlService } from 'src/app/Services/sesion-control.service';
import { UserControlService } from 'src/app/Services/user-control.service';
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

  FormLogin:FormGroup;

  @ViewChild(IonModal) modal: IonModal | undefined;

  constructor(
    private sessionS: SesionControlService,
    private users : UserControlService,
    private alertS : AlertsToastServiceService,
    private router: Router,
    private alertC : AlertController,
  ) {this.FormLogin = this.FormLoginGroup(); }

  ngOnInit() {
  }


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

  async logIn(){
    // console.log(this.FormLogin.value);
    this.sessionS.logIn(this.FormLogin.get('email')?.value, this.FormLogin.get('password')?.value).then(
      response => {
        // console.log(response);
        this.router.navigate(['./campaigns/animales']);
        this.user = response;
        // console.log(this.user.user.uid);
        this.users.getUser(this.user?.user?.uid).subscribe(
          _user => {
            this.alertS.loginSuccess(_user?.strUsername);
            this.FormLogin.reset();
          }
        )
    }).catch(error => {
      this.LogueoFallido();
      // console.log(error);
    });
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
      header: 'Inicio de sesión Fallido',
      subHeader: 'Las credenciales ingresadas son incorrectas!',
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
