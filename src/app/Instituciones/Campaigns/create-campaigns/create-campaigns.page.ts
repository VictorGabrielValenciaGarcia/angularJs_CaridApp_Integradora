import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import Campania, { Estado, Programa_Sector, EnserCalsificacion } from 'src/app/Interfaces/Campania.interface';
import CentroAcopio from 'src/app/Interfaces/CentroAcopio.interface';
import { AlertsToastServiceService } from 'src/app/Services/alerts-toast-service.service';
import { CampaignControlServiceService } from 'src/app/Services/campaign-control-service.service';
import { CenterControlServiceService } from 'src/app/Services/center-control-service.service';
import { RegexServiceService } from 'src/app/Services/regex-service.service';

@Component({
  selector: 'app-create-campaigns',
  templateUrl: './create-campaigns.page.html',
  styleUrls: ['./create-campaigns.page.scss'],
})
export class CreateCampaignsPage implements OnInit {

  id : string = '';
  update : boolean = false;

  allCenters : CentroAcopio[] = [];
  myCenters : CentroAcopio[] = [];
  campaign : any;

  clasificacion = EnserCalsificacion;

  public createCampaignForm : FormGroup;

  constructor(
    private router : Router,
    private regex : RegexServiceService,
    private formB : FormBuilder,
    private campaignC : CampaignControlServiceService,
    private centerC : CenterControlServiceService,
    private alertS : AlertsToastServiceService,
    private ar : ActivatedRoute,
  ) {

    this.centerC.getCenters().subscribe(
      _data =>{
        console.log(_data);
        this.allCenters = _data;
      }
    )

    this.createCampaignForm = this.formB.group({

      strNombre_Campania: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(150),
        Validators.pattern(this.regex.lt_sp_dt),
      ]],
      strImage_Campania: ['', [
        Validators.required,
      ]],
      strPrograma_Sector_Campania: ['', [
        Validators.required,
      ]],
      strDescripcion_Campania: ['', [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(300),
      ]],
      strFecha_Inicio_Campania: ['', [
        Validators.required,
      ]],
      strFecha_Fin_Campania: ['', [
        Validators.required,
      ]],

      arrLista_Enseres_Campania : this.formB.array([
        this.formB.group({
          strClasificacion: ['', [
            Validators.required,
          ]],
          strNombre_Enser: ['', [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
            Validators.pattern(this.regex.lt_num_sp)
          ]],
          strRequisitos: ['Ninguno', [
            Validators.required,
            Validators.maxLength(200),
            Validators.pattern(this.regex.lt_sp_dt)
          ]],
        })
      ]),

      arrCentros_Acopio_Campania : this.formB.array([
        this.formB.group({
          strIdCenter: ['', [
            Validators.required,
          ]],
        })
      ]),
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){

    this.ar.params.subscribe(
      (_id:any) => {
        console.log(_id.id);
        if(_id.id){
          this.update = true;
          this.id = _id.id

          this.campaignC.getCampaignById(this.id).subscribe(
            (_campaign : Campania) => {
              console.log(_campaign);

              this.campaign = _campaign;

              this.createCampaignForm.get('strImage_Campania')?.reset(_campaign.strImage_Campania);
              this.createCampaignForm.get('strNombre_Campania')?.reset(_campaign.strNombre_Campania);
              this.createCampaignForm.get('strPrograma_Sector_Campania')?.reset(_campaign.strPrograma_Sector_Campania);
              this.createCampaignForm.get('strDescripcion_Campania')?.reset(_campaign.strDescripcion_Campania);

              this.createCampaignForm.get('strFecha_Inicio_Campania')?.reset(_campaign.strFecha_Inicio_Campania);
              this.createCampaignForm.get('strFecha_Fin_Campania')?.reset(_campaign.strFecha_Fin_Campania);
              this.createCampaignForm.get('arrLista_Enseres_Campania')?.reset(_campaign.arrLista_Enseres_Campania);
              this.createCampaignForm.get('arrCentros_Acopio_Campania')?.reset(_campaign.arrCentros_Acopio_Campania);

              this.createCampaignForm.get('numId_Institucion')?.reset(_campaign.numId_Institucion);
              this.createCampaignForm.get('strEstado_Campania')?.reset(_campaign.strEstado_Campania);
              this.createCampaignForm.get('numCantidad_Amonestaciones_Campania')?.reset(_campaign.numCantidad_Amonestaciones_Campania);
              this.createCampaignForm.get('numCantidad_Reportes')?.reset(_campaign.numCantidad_Reportes);

            }
          );
        }
      }
    );

  }

  // Form Control
  resetAllForms(){
    this.createCampaignForm.reset();
  }

  async createCampaign(){
    console.log(this.createCampaignForm.value);

    let campaign : Campania = {
      strImage_Campania : this.createCampaignForm.get('strImage_Campania')?.value,

      strNombre_Campania : this.createCampaignForm.get('strNombre_Campania')?.value,
      strPrograma_Sector_Campania : this.createCampaignForm.get('strPrograma_Sector_Campania')?.value,
      strDescripcion_Campania : this.createCampaignForm.get('strDescripcion_Campania')?.value,

      strFecha_Inicio_Campania : this.createCampaignForm.get('strFecha_Inicio_Campania')?.value,
      strFecha_Fin_Campania : this.createCampaignForm.get('strFecha_Fin_Campania')?.value,

      arrLista_Enseres_Campania : this.createCampaignForm.get('arrLista_Enseres_Campania')?.value,
      arrCentros_Acopio_Campania : this.createCampaignForm.get('arrCentros_Acopio_Campania')?.value,

      // Invisibles en el Formulario
      numId_Institucion : '',

      strEstado_Campania : Estado.Vigente,

      numCantidad_Amonestaciones_Campania : 0,
      numCantidad_Reportes : 0,

    };

    console.log(campaign);
    const response = await this.campaignC.addCampaign(campaign)
    if(response){
      this.alertS.successToast('Mis Campañas');
      this.resetAllForms()
      this.router.navigate(['./mi-campaigns']);
    }
    console.log(response);

  }

  async updateCampaign(){
    console.log(this.createCampaignForm.value);

    let campaign : Campania = {
      strImage_Campania : this.createCampaignForm.get('strImage_Campania')?.value,

      strNombre_Campania : this.createCampaignForm.get('strNombre_Campania')?.value,
      strPrograma_Sector_Campania : this.createCampaignForm.get('strPrograma_Sector_Campania')?.value,
      strDescripcion_Campania : this.createCampaignForm.get('strDescripcion_Campania')?.value,

      strFecha_Inicio_Campania : this.createCampaignForm.get('strFecha_Inicio_Campania')?.value,
      strFecha_Fin_Campania : this.createCampaignForm.get('strFecha_Fin_Campania')?.value,

      arrLista_Enseres_Campania : this.createCampaignForm.get('arrLista_Enseres_Campania')?.value,
      arrCentros_Acopio_Campania : this.createCampaignForm.get('arrCentros_Acopio_Campania')?.value,

      // Invisibles en el Formulario
      numId_Institucion : this.campaign.numId_Institucion,

      strEstado_Campania : Estado.Vigente,

      numCantidad_Amonestaciones_Campania : this.campaign.numCantidad_Amonestaciones_Campania,
      numCantidad_Reportes : this.campaign.numCantidad_Reportes,

    };

    console.log(campaign);

    this.campaignC.updateCampaign(campaign,this.id)
    this.alertS.updateToast(campaign.strNombre_Campania);
    this.resetAllForms()
    this.router.navigate(['./mi-campaigns']);

  }

  // Array Form Enseres

  get arrLista_Enseres_Campania(){
    return this.createCampaignForm.get('arrLista_Enseres_Campania') as FormArray;
  }

  addNewInputFieldEnser() {
    this.arrLista_Enseres_Campania.push(
      this.formB.group({
        strClasificacion: ['', [
          Validators.required,
        ]],
        strNombre_Enser: ['', [
          Validators.required,
        ]],
        strRequisitos: ['Ninguno', [
          Validators.required,
        ]],
      })
    )
  }

  removeInputFieldEnser(_id : number) {
    this.arrLista_Enseres_Campania.removeAt(_id);
  }

  // Array Form Id Centers

  get arrCentros_Acopio_Campania(){
    return this.createCampaignForm.get('arrCentros_Acopio_Campania') as FormArray;
  }

  addNewInputField() {
    this.arrCentros_Acopio_Campania.push(
      this.formB.group({
        strIdCenter: ['', [
          Validators.required,
        ]],
      })
    )
  }

  removeInputField(_id : number) {
    this.arrCentros_Acopio_Campania.removeAt(_id);
  }

// Elementos
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} carácteres disponibles`;
  }

}
