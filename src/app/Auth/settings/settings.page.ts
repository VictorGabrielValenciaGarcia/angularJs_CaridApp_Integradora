import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import CentroAcopio from 'src/app/Interfaces/CentroAcopio.interface';
import Usuario from 'src/app/Interfaces/Usuario.interface';
import { AlertsToastServiceService } from 'src/app/Services/alerts-toast-service.service';
import { CenterControlServiceService } from 'src/app/Services/center-control-service.service';
import { RegexServiceService } from 'src/app/Services/regex-service.service';
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
  centrosInst : CentroAcopio[] = [];
  contactosInst : any[] =[];

  user : Usuario = {
    uid : '',
    rotullus : 'Carid-User',
    strCorreo : '',
    strTelefono : '',
    strPassword : '',
    strUsername : '',
    strFoto_Perfil : '',
    mapNombre : {
      strApellido_Materno : '',
      strApellido_Paterno : '',
      strNombre : '',
    }
  }

  // User Forms
  settingsPersonalForm !: FormGroup;
  settingsContactForm !: FormGroup;
  settingsProfileForm !: FormGroup;
  settingsInstDataForm !: FormGroup;

  constructor(
    private router : Router,
    private userS : UserControlService,
    private regex : RegexServiceService,
    private sesionS : SesionControlService,
    private alertS : AlertsToastServiceService,
    private centroS : CenterControlServiceService,
  ) {}

  ngOnInit() {

    // User Forms
    this.settingsPersonalForm = this.settingsPersonalFormGroup();
    this.settingsContactForm = this.settingsContactFormFormGroup();

    // Institutions Forms
    this.settingsInstDataForm = this.settingsInstDataFormGroup();

    // General Forms
    this.settingsProfileForm = this.settingsProfileFormFormGroup();


    this.userS.getUser(this.sesionS.getCurrenUser()).subscribe(
      (_user : any) => {
        this.user = _user;
        // console.log(this.user);
        // console.log(this.user.rotullus);

        if(_user.rotullus === 'Carid-Inst'){

          this.contactosInst = this.user.arrCorreos_Institucion!;

          this.centroS.getCenters().subscribe(
            (_data : CentroAcopio[]) =>{
              let allCenters = _data;
              this.centrosInst = allCenters.filter(f => f.numId_Institucion === this.user.uid);
            }
          );


          this.settingsInstDataForm.get('strNombre_Institucion')?.reset(this.user.strNombre_Institucion);
          this.settingsInstDataForm.get('strRFC_Institucion')?.reset(this.user.strRFC_Institucion);
          this.settingsInstDataForm.get('strFacebook')?.reset(this.user.mapRedes_Sociales_Institucion?.strFacebook);
          this.settingsInstDataForm.get('strInstagram')?.reset(this.user.mapRedes_Sociales_Institucion?.strInstagram);
          this.settingsInstDataForm.get('strTwitter')?.reset(this.user.mapRedes_Sociales_Institucion?.strTwitter);

          this.settingsProfileForm.get('strUsername')?.reset(this.user.strUsername);

        }

        if(_user.rotullus === 'Carid-User'){
          this.settingsPersonalForm.get('strNombre')?.reset(this.user.mapNombre?.strNombre);
          this.settingsPersonalForm.get('strApellido_Paterno')?.reset(this.user.mapNombre?.strApellido_Paterno);
          this.settingsPersonalForm.get('strApellido_Materno')?.reset(this.user.mapNombre?.strApellido_Materno);
          this.settingsPersonalForm.get('strTelefono')?.reset(this.user.strTelefono);

          this.settingsContactForm.get('strColonia')?.reset(this.user.mapDireccion_Usuario?.strColonia);
          this.settingsContactForm.get('strCalle')?.reset(this.user.mapDireccion_Usuario?.strCalle);
          this.settingsContactForm.get('numNumero_Casa')?.reset(this.user.mapDireccion_Usuario?.numNumero_Casa);
          this.settingsContactForm.get('numCP')?.reset(this.user.mapDireccion_Usuario?.numCP);

          this.settingsProfileForm.get('strUsername')?.reset(this.user.strUsername);
        }
      }
    );
  }

  // User Update Forms

    settingsPersonalFormGroup(){
      return new FormGroup({
        strNombre: new FormControl('', [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(3),
          Validators.pattern(this.regex.lt_sp),
        ]),
        strApellido_Paterno: new FormControl('', [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(3),
          Validators.pattern(this.regex.lt_sp),
        ]),
        strApellido_Materno: new FormControl('', [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(3),
          Validators.pattern(this.regex.lt_sp),
        ]),
        strTelefono: new FormControl('', [
          Validators.required,
          Validators.maxLength(18),
          Validators.minLength(10),
          Validators.pattern(this.regex.phone),
        ]),
      });
    }

    settingsContactFormFormGroup(){
      return new FormGroup({
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
      });
    }

  // Institutions Update Form

    settingsInstDataFormGroup(){
      return new FormGroup({
        strNombre_Institucion: new FormControl('', [
          Validators.required,
          Validators.pattern(this.regex.lt_num_sp_us_dt),
        ]),
        strRFC_Institucion: new FormControl('', [
          Validators.required,
          Validators.pattern(this.regex.rfc),
        ]),
        strFacebook: new FormControl('',[
          Validators.pattern(this.regex.lt_num_sp_us_arr),
        ]),
        strInstagram: new FormControl('', [
          Validators.pattern(this.regex.lt_num_sp_us_arr),
        ]),
        strTwitter: new FormControl('', [
          Validators.pattern(this.regex.lt_num_sp_us_arr),
        ]),
      });
    }

  // General Update Forms

    settingsProfileFormFormGroup(){
      return new FormGroup({
        strUsername: new FormControl("", [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(5),
          Validators.pattern(this.regex.lt_num_sp_us),
        ]),
      });
    }

  // User Update Methods

    settingsPersonal(){
      // console.log(this.settingsPersonalForm.value);

      let newDataUSer = this.user;

      newDataUSer.mapNombre!.strNombre = this.settingsPersonalForm.get('strNombre')?.value;
      newDataUSer.mapNombre!.strApellido_Paterno = this.settingsPersonalForm.get('strApellido_Paterno')?.value;
      newDataUSer.mapNombre!.strApellido_Materno = this.settingsPersonalForm.get('strApellido_Materno')?.value;
      newDataUSer.strTelefono = this.settingsPersonalForm.get('strTelefono')?.value;

      // console.log(newDataUSer);

      this.userS.updateUSer(newDataUSer, newDataUSer.uid!)
      this.alertS.updateUserSucces();

    }

    settingsContact(){
      // console.log(this.settingsContactForm.value);

      let newDataUSer = this.user;

      newDataUSer.mapDireccion_Usuario!.strColonia = this.settingsContactForm.get('strColonia')?.value;
      newDataUSer.mapDireccion_Usuario!.strCalle = this.settingsContactForm.get('strCalle')?.value;
      newDataUSer.mapDireccion_Usuario!.numNumero_Casa = this.settingsContactForm.get('numNumero_Casa')?.value;
      newDataUSer.mapDireccion_Usuario!.numCP = this.settingsContactForm.get('numCP')?.value;

      // console.log(newDataUSer);

      this.userS.updateUSer(newDataUSer, newDataUSer.uid!)
      this.alertS.updateUserSucces();

    }

  // Institutions Update Methods

    settingsInstData(){
      // console.log(this.settingsInstDataForm.value);

      let newDataUSer = this.user;

      newDataUSer.strNombre_Institucion = this.settingsInstDataForm.get('strNombre_Institucion')?.value;
      newDataUSer.strRFC_Institucion = this.settingsInstDataForm.get('strRFC_Institucion')?.value;
      newDataUSer.mapRedes_Sociales_Institucion!.strFacebook = this.settingsInstDataForm.get('strFacebook')?.value;
      newDataUSer.mapRedes_Sociales_Institucion!.strTwitter = this.settingsInstDataForm.get('strTwitter')?.value;
      newDataUSer.mapRedes_Sociales_Institucion!.strInstagram = this.settingsInstDataForm.get('strInstagram')?.value;

      // console.log(newDataUSer);

      this.userS.updateUSer(newDataUSer, newDataUSer.uid!)
      this.alertS.updateUserSucces();

    }

  // General Update Method

    settingsProfile(){
      // console.log(this.settingsContactForm.value);

      let newDataUSer = this.user;

      newDataUSer.strUsername = this.settingsProfileForm.get('strUsername')?.value;

      // console.log(newDataUSer);

      this.userS.updateUSer(newDataUSer, newDataUSer.uid!)
      this.alertS.updateUserSucces();

    }

// Elements

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

// Page Interactions

  showChangePass(){
    this.modalInfo?.present()
  }

  showContent(_contentType : string){
    this.content = _contentType;
    // console.log(this.content);
  }

  upload(){
    this.router.navigate(['./cuy-shop']);
  }

}
