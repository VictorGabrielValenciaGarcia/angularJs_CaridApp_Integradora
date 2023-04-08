import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MapServiceService } from 'src/app/Services/map-service.service';

import { Map } from 'mapbox-gl';
import { Marker } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment.prod';
import { RegexServiceService } from 'src/app/Services/regex-service.service';
import { CenterControlServiceService } from 'src/app/Services/center-control-service.service';
import CentroAcopio from 'src/app/Interfaces/CentroAcopio.interface';
import { AlertsToastServiceService } from 'src/app/Services/alerts-toast-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-center',
  templateUrl: './create-center.page.html',
  styleUrls: ['./create-center.page.scss'],
})
export class CreateCenterPage implements OnInit {

  // Variables _ Mapa
  public mapForm !: mapboxgl.Map;
  public styleMap = 'mapbox://styles/mapbox/outdoors-v12';

  estados : any = [];
  latitude : any;
  longitude : any;
  latitude_Center : number = 0;
  longitude_Center : number = 0;

  // Center Data
  id : string = '';
  update : boolean = false;
  centerInfo : any;

  // SearchBar

  public createCenterForm : FormGroup;

  constructor(
    private mapS : MapServiceService,
    private router : Router,
    private regex : RegexServiceService,
    private formB : FormBuilder,
    private alertS : AlertsToastServiceService,
    private centerS : CenterControlServiceService,
    private ar : ActivatedRoute
  ) {
    (mapboxgl as any).accessToken = environment.MAPBOX_KEY;
    this.estados = this.mapS.EstadosMexico;

    this.createCenterForm = this.formB.group({
      strNombre_CentroA: ['', [
        Validators.required,
        Validators.pattern(this.regex.lt_num_sp_us_dt),
      ]],
      strImage_CentroA: ['', [
        Validators.required,
      ]],
      numId_Institucion: ['1', [
        Validators.required,
      ]],

      strFacebook: ['Ninguno',[
        Validators.pattern(this.regex.lt_num_sp_us_arr),
      ]],
      strInstagram: ['Ninguno', [
        Validators.pattern(this.regex.lt_num_sp_us_arr),
      ]],
      strTikTok: ['Ninguno', [
        Validators.pattern(this.regex.lt_num_sp_us_arr),
      ]],
      strTwitter: ['Ninguno', [
        Validators.pattern(this.regex.lt_num_sp_us_arr),
      ]],
      strWhatsApp: ['', [
        Validators.required,
        Validators.pattern(this.regex.phone),
      ]],
      strTelefono: ['', [
        Validators.required,
        Validators.pattern(this.regex.phone),
      ]],

      numCP: ['', [
        Validators.required,
        Validators.pattern(this.regex.ptIntNum),
      ]],
      numNumero_Exterior: [null, [
        Validators.pattern(this.regex.ptIntNum),
      ]],
      numNumero_Interior: [null, [
        Validators.pattern(this.regex.ptIntNum),
      ]],
      strCalle: ['', [
        Validators.required,
        Validators.pattern(this.regex.lt_sp),
      ]],
      strCiudad: ['', [
        Validators.required,
        Validators.pattern(this.regex.lt_sp_dt),
      ]],
      strColonia: ['', [
        Validators.required,
        Validators.pattern(this.regex.lt_sp_dt),
      ]],
      strEstado: ['', [
        Validators.required,
      ]],
      strMunicipio: ['', [
        Validators.required,
        Validators.pattern(this.regex.lt_sp),
      ]],

      longitud: ['', [
        Validators.required,
      ]],
      latitud: ['', [
        Validators.required,
      ]],

      arrCorreos_CentroA : this.formB.array([
          this.formB.group({
            strCorreo: ['', [
              Validators.required,
              Validators.email,
            ]],
            strDepartamento: ['', [
              Validators.required,
              Validators.pattern(this.regex.lt_sp_dt),
            ]],
            strEncargado: ['', [
              Validators.required,
              Validators.pattern(this.regex.lt_sp_dt),
            ]],
            strTelefono_Departamento: ['', [
              Validators.required,
              Validators.pattern(this.regex.phone),
            ]],
        })
      ]),
    });

  }

  ngOnInit() {
    // this.ar.params.subscribe(
    //   (_id:any) => {
    //     // console.log(_id.id);

    //     if(_id.id){
    //       this.update = true;
    //       this.id = _id.id

    //       this.centerS.getCenterById(this.id).subscribe(
    //         (_center : any) => {
    //           console.log(_center);

    //           this.createCenterForm.get('strNombre_CentroA')?.reset(_center.strNombre_CentroA);
    //           this.createCenterForm.get('strSubtitulo_CentroA')?.reset(_center.strSubtitulo_CentroA);
    //           this.createCenterForm.get('strImage_CentroA')?.reset(_center.strImage_CentroA);
    //           this.createCenterForm.get('numId_Institucion')?.reset(_center.numId_Institucion);

    //           this.createCenterForm.get('arrCorreos_CentroA')?.reset(_center.mapContactos_CentroA.arrCorreos_CentroA);
    //           this.createCenterForm.get('strFacebook')?.reset(_center.mapContactos_CentroA.strFacebook);
    //           this.createCenterForm.get('strInstagram')?.reset(_center.mapContactos_CentroA.strInstagram);
    //           this.createCenterForm.get('strTelefono')?.reset(_center.mapContactos_CentroA.strTelefono);
    //           this.createCenterForm.get('strTikTok')?.reset(_center.mapContactos_CentroA.strTikTok);
    //           this.createCenterForm.get('strTwitter')?.reset(_center.mapContactos_CentroA.strTwitter);
    //           this.createCenterForm.get('strWhatsApp')?.reset(_center.mapContactos_CentroA.strWhatsApp);

    //           this.createCenterForm.get('numCP')?.reset(_center.mapDireccion_Fisica_CentroA.numCP);
    //           this.createCenterForm.get('numNumero_Exterior')?.reset(_center.mapDireccion_Fisica_CentroA.numNumero_Exterior);
    //           this.createCenterForm.get('numNumero_Interior')?.reset(_center.mapDireccion_Fisica_CentroA.numNumero_Interior);
    //           this.createCenterForm.get('strCalle')?.reset(_center.mapDireccion_Fisica_CentroA.strCalle);
    //           this.createCenterForm.get('strCiudad')?.reset(_center.mapDireccion_Fisica_CentroA.strCiudad);
    //           this.createCenterForm.get('strColonia')?.reset(_center.mapDireccion_Fisica_CentroA.strColonia);
    //           this.createCenterForm.get('strEstado')?.reset(_center.mapDireccion_Fisica_CentroA.strEstado);
    //           this.createCenterForm.get('strMunicipio')?.reset(_center.mapDireccion_Fisica_CentroA.strMunicipio);

    //           this.createCenterForm.get('longitud')?.reset(_center.mapDireccion_GPS_CentroA.longitud);
    //           this.createCenterForm.get('latitud')?.reset(_center.mapDireccion_GPS_CentroA.latitud);

    //         }
    //       );
    //     }
    //   }
    // );
  }

  ionViewWillEnter(){

    this.ar.params.subscribe(
      (_id:any) => {
        console.log(_id.id);
        if(_id.id){
          this.update = true;
          this.id = _id.id

          this.centerS.getCenterById(this.id).subscribe(
            (_center : any) => {
              console.log(_center);
              this.buildMap(_center.mapDireccion_GPS_CentroA.latitud,_center.mapDireccion_GPS_CentroA.longitud);

              this.latitude = _center.mapDireccion_GPS_CentroA.latitude;
              this.longitude = _center.mapDireccion_GPS_CentroA.longitud;

              this.createCenterForm.get('strNombre_CentroA')?.reset(_center.strNombre_CentroA);
              this.createCenterForm.get('strSubtitulo_CentroA')?.reset(_center.strSubtitulo_CentroA);
              this.createCenterForm.get('strImage_CentroA')?.reset(_center.strImage_CentroA);
              this.createCenterForm.get('numId_Institucion')?.reset(_center.numId_Institucion);

              this.createCenterForm.get('arrCorreos_CentroA')?.reset(_center.mapContactos_CentroA.arrCorreos_CentroA);
              this.createCenterForm.get('strFacebook')?.reset(_center.mapContactos_CentroA.strFacebook);
              this.createCenterForm.get('strInstagram')?.reset(_center.mapContactos_CentroA.strInstagram);
              this.createCenterForm.get('strTelefono')?.reset(_center.mapContactos_CentroA.strTelefono);
              this.createCenterForm.get('strTikTok')?.reset(_center.mapContactos_CentroA.strTikTok);
              this.createCenterForm.get('strTwitter')?.reset(_center.mapContactos_CentroA.strTwitter);
              this.createCenterForm.get('strWhatsApp')?.reset(_center.mapContactos_CentroA.strWhatsApp);

              this.createCenterForm.get('numCP')?.reset(_center.mapDireccion_Fisica_CentroA.numCP);
              this.createCenterForm.get('numNumero_Exterior')?.reset(_center.mapDireccion_Fisica_CentroA.numNumero_Exterior);
              this.createCenterForm.get('numNumero_Interior')?.reset(_center.mapDireccion_Fisica_CentroA.numNumero_Interior);
              this.createCenterForm.get('strCalle')?.reset(_center.mapDireccion_Fisica_CentroA.strCalle);
              this.createCenterForm.get('strCiudad')?.reset(_center.mapDireccion_Fisica_CentroA.strCiudad);
              this.createCenterForm.get('strColonia')?.reset(_center.mapDireccion_Fisica_CentroA.strColonia);
              this.createCenterForm.get('strEstado')?.reset(_center.mapDireccion_Fisica_CentroA.strEstado);
              this.createCenterForm.get('strMunicipio')?.reset(_center.mapDireccion_Fisica_CentroA.strMunicipio);

              this.createCenterForm.get('longitud')?.reset(_center.mapDireccion_GPS_CentroA.longitud);
              this.createCenterForm.get('latitud')?.reset(_center.mapDireccion_GPS_CentroA.latitud);

            }
          );
        } else {
          this.longitude = this.mapS.locations[0];
          this.latitude = this.mapS.locations[1];
          this.buildMap(this.latitude,this.longitude);
        }
      }
    );

  }

  resetAllForms(){
    this.createCenterForm.reset();
  }

  async createCenter(){
    console.log(this.createCenterForm.value);

    let center : CentroAcopio = {

      strNombre_CentroA: this.createCenterForm.get('strNombre_CentroA')?.value,
      strImage_CentroA:this.createCenterForm.get('strImage_CentroA')?.value,
      numId_Institucion : this.createCenterForm.get('numId_Institucion')?.value,

      mapContactos_CentroA : {
        arrCorreos_CentroA : this.createCenterForm.get('arrCorreos_CentroA')?.value,
        strFacebook : this.createCenterForm.get('strFacebook')?.value,
        strInstagram : this.createCenterForm.get('strInstagram')?.value,
        strTelefono : this.createCenterForm.get('strTelefono')?.value,
        strTikTok : this.createCenterForm.get('strTikTok')?.value,
        strTwitter : this.createCenterForm.get('strTwitter')?.value,
        strWhatsApp : this.createCenterForm.get('strWhatsApp')?.value,
      },

      mapDireccion_Fisica_CentroA :{
        numCP:this.createCenterForm.get('numCP')?.value,
        numNumero_Exterior:this.createCenterForm.get('numNumero_Exterior')?.value,
        numNumero_Interior:this.createCenterForm.get('numNumero_Interior')?.value,
        strCalle:this.createCenterForm.get('strCalle')?.value,
        strCiudad:this.createCenterForm.get('strCiudad')?.value,
        strColonia:this.createCenterForm.get('strColonia')?.value,
        strEstado:this.createCenterForm.get('strEstado')?.value,
        strMunicipio:this.createCenterForm.get('strMunicipio')?.value,
      },

      mapDireccion_GPS_CentroA :{
        longitud:this.createCenterForm.get('longitud')?.value,
        latitud:this.createCenterForm.get('latitud')?.value,
      },

    };

    console.log(center);
    const response = await this.centerS.addCenter(center)
    if(response){
      this.alertS.successToast('Centros de Acopio');
      this.router.navigate(['./mi-centers']);
    }
    console.log(response);

  }

  async updateCenter(){
    console.log(this.createCenterForm.value);

    let center : CentroAcopio = {

      strNombre_CentroA: this.createCenterForm.get('strNombre_CentroA')?.value,
      strImage_CentroA:this.createCenterForm.get('strImage_CentroA')?.value,
      numId_Institucion : this.createCenterForm.get('numId_Institucion')?.value,

      mapContactos_CentroA : {
        arrCorreos_CentroA : this.createCenterForm.get('arrCorreos_CentroA')?.value,
        strFacebook : this.createCenterForm.get('strFacebook')?.value,
        strInstagram : this.createCenterForm.get('strInstagram')?.value,
        strTelefono : this.createCenterForm.get('strTelefono')?.value,
        strTikTok : this.createCenterForm.get('strTikTok')?.value,
        strTwitter : this.createCenterForm.get('strTwitter')?.value,
        strWhatsApp : this.createCenterForm.get('strWhatsApp')?.value,
      },

      mapDireccion_Fisica_CentroA :{
        numCP:this.createCenterForm.get('numCP')?.value,
        numNumero_Exterior:this.createCenterForm.get('numNumero_Exterior')?.value,
        numNumero_Interior:this.createCenterForm.get('numNumero_Interior')?.value,
        strCalle:this.createCenterForm.get('strCalle')?.value,
        strCiudad:this.createCenterForm.get('strCiudad')?.value,
        strColonia:this.createCenterForm.get('strColonia')?.value,
        strEstado:this.createCenterForm.get('strEstado')?.value,
        strMunicipio:this.createCenterForm.get('strMunicipio')?.value,
      },

      mapDireccion_GPS_CentroA :{
        longitud:this.createCenterForm.get('longitud')?.value,
        latitud:this.createCenterForm.get('latitud')?.value,
      },

    };

    console.log(center);

    this.centerS.updateCenter(center,this.id)
    this.alertS.updateToast(center.strNombre_CentroA);
    this.router.navigate(['./mi-centers']);

  }

  // Array Form

    get arrCorreos_CentroA(){
      return this.createCenterForm.get('arrCorreos_CentroA') as FormArray;
    }

    addNewInputFields() {
      this.arrCorreos_CentroA.push(
        this.formB.group({
          strCorreo: ['', [
            Validators.required,
          ]],
          strDepartamento: ['', [
            Validators.required,
          ]],
          strEncargado: ['', [
            Validators.required,
          ]],
          strTelefono_Departamento: ['', [
            Validators.required,
          ]],
        })
      )
    }

    removeInputField(_id : number) {
      this.arrCorreos_CentroA.removeAt(_id);
    }

  // Elementos
    customCounterFormatter(inputLength: number, maxLength: number) {
      return `${maxLength - inputLength} carácteres disponibles`;
    }

  // Mapa

    buildMap(_lat : number, _long :number){

      if (!this.update) {

        this.mapForm = new Map({
          container: 'mapboxForm',
          interactive : true,
          style: this.styleMap,
          zoom : 16.6,
          center: [
            this.latitude,
            this.longitude
          ]
        });

        this.mapForm.addControl(new mapboxgl.NavigationControl());
        this.mapForm.addControl(new mapboxgl.FullscreenControl());
        this.mapForm.addControl(new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        }));

        const marker = new mapboxgl.Marker({draggable: true}).setLngLat([_lat,_long]).addTo(this.mapForm);

        marker.on('dragend', () => {
          const lngLat = marker.getLngLat();
          this.latitude_Center = lngLat.lat;
          this.longitude_Center = lngLat.lng;

          console.log(this.latitude_Center, this.longitude_Center);

        });
      } else {
        this.mapForm = new Map({
          container: 'mapboxForm',
          interactive : true,
          style: this.styleMap,
          zoom : 16.6,
          center: [
            _long,
            _lat,
          ]
        });

        this.mapForm.addControl(new mapboxgl.NavigationControl());
        this.mapForm.addControl(new mapboxgl.FullscreenControl());
        this.mapForm.addControl(new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        }));

        const marker = new mapboxgl.Marker({draggable: true}).setLngLat([_long,_lat]).addTo(this.mapForm);

        marker.on('dragend', () => {
          const lngLat = marker.getLngLat();
          this.latitude_Center = lngLat.lat;
          this.longitude_Center = lngLat.lng;

          console.log(this.latitude_Center, this.longitude_Center);

        });
      }

      this.mapForm.resize();

    }
}
