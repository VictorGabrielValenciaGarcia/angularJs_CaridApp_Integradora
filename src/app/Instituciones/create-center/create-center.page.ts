import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MapServiceService } from 'src/app/Services/map-service.service';

import { Map } from 'mapbox-gl';
import { Marker } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment.prod';
import { RegexServiceService } from 'src/app/Services/regex-service.service';

@Component({
  selector: 'app-create-center',
  templateUrl: './create-center.page.html',
  styleUrls: ['./create-center.page.scss'],
})
export class CreateCenterPage implements OnInit {

  public map !: mapboxgl.Map;
  public styleMap = 'mapbox://styles/mapbox/outdoors-v12';

  estados : any = [];
  latitude : any;
  longitude : any;
  latitude_Center : number = 0;
  longitude_Center : number = 0;

  public createCenterForm : FormGroup;

  constructor(
    private mapS : MapServiceService,
    private formB : FormBuilder,
    private regex : RegexServiceService
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
      numId_Institucion: ['', [
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
        Validators.pattern(this.regex.lt_sp),
      ]],
      strColonia: ['', [
        Validators.required,
        Validators.pattern(this.regex.lt_sp),
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
              Validators.pattern(this.regex.lt_sp),
            ]],
            strTelefono_Departamento: ['', [
              Validators.required,
              Validators.pattern(this.regex.phone),
            ]],
        })
      ]),
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    if(!this.map){
      this.buildMap();
    }
  }

  resetAllForms(){}

  createCenter(){
    console.log(this.createCenterForm.value);
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

  buildMap(){
    this.longitude = this.mapS.locations[0];
    this.latitude = this.mapS.locations[1];
    this.map = new Map({
      container: 'mapbox',
      interactive : true,
      style: this.styleMap,
      zoom : 16.6,
      center: [
        this.latitude,
        this.longitude
      ]
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.FullscreenControl());
    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    const marker = new mapboxgl.Marker({draggable: true}).setLngLat([this.latitude,this.longitude]).addTo(this.map);

    // function onDragEnd() {
    //   const lngLat = marker.getLngLat();
    //   console.log(lngLat.lng,lngLat.lat);
    //   return lngLat;
    // }

    marker.on('dragend', () => {
      const lngLat = marker.getLngLat();
      this.latitude_Center = lngLat.lat;
      this.longitude_Center = lngLat.lng;

      console.log(this.latitude_Center, this.longitude_Center);

    });

    this.map.resize();

  }
}
