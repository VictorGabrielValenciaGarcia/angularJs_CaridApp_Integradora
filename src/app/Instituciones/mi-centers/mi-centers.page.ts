import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonContent } from '@ionic/angular';

import { Map } from 'mapbox-gl';
import { Popup, Marker } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment.prod';
import { MapServiceService } from '../../Services/map-service.service';
import { Router } from '@angular/router';
import CentroAcopio from '../../Interfaces/CentroAcopio.interface';
import { Contacto } from '../../Interfaces/CentroAcopio.interface';

@Component({
  selector: 'app-mi-centers',
  templateUrl: './mi-centers.page.html',
  styleUrls: ['./mi-centers.page.scss'],
})

export class MiCentersPage implements OnInit {

  public map !: mapboxgl.Map;
  public styleMap = 'mapbox://styles/mapbox/outdoors-v12';

  latitude : any;
  longitude : any;

  campaignList: CentroAcopio[] = [
    {
      strNombre_CentroA : 'Parque De la Familia',
      strImage_CentroA : './assets/Images/lineDivider3.png',
      numId_Institucion : 1,

      mapContactos_CentroA : {
        arrCorreos_CentroA : [],
        strFacebook : "",
        strInstagram : "",
        strTelefono : "",
        strTikTok : "",
        strTwitter : "",
        strWhatsApp : "",
      },

      mapDireccion_Fisica_CentroA :{
        numCP:71295,
        numNumero_Exterior:12,
        numNumero_Interior:12,
        strCalle: "",
        strCiudad: "",
        strColonia: "",
        strEstado: "",
        strMunicipio: "",
      },

      mapDireccion_GPS_CentroA :{
        latitud : -17.386378,
        longitud: -66.1628018,
      },
    },
    {
      strNombre_CentroA : 'Mariscal Santa Cruz',
      strImage_CentroA : './assets/Images/lineDivider3.png',
      numId_Institucion : 1,

      mapContactos_CentroA : {
        arrCorreos_CentroA : [],
        strFacebook : "",
        strInstagram : "",
        strTelefono : "",
        strTikTok : "",
        strTwitter : "",
        strWhatsApp : "",
      },

      mapDireccion_Fisica_CentroA :{
        numCP:71295,
        numNumero_Exterior:12,
        numNumero_Interior:12,
        strCalle: "",
        strCiudad: "",
        strColonia: "",
        strEstado: "",
        strMunicipio: "",
      },

      mapDireccion_GPS_CentroA :{
        latitud : -17.4005556,
        longitud: -66.1741667,
      },
    },
    {
      strNombre_CentroA : 'Parque de Educación Vial',
      strImage_CentroA : './assets/Images/lineDivider3.png',
      numId_Institucion : 1,

      mapContactos_CentroA : {
        arrCorreos_CentroA : [],
        strFacebook : "",
        strInstagram : "",
        strTelefono : "",
        strTikTok : "",
        strTwitter : "",
        strWhatsApp : "",
      },

      mapDireccion_Fisica_CentroA :{
        numCP:71295,
        numNumero_Exterior:12,
        numNumero_Interior:12,
        strCalle: "",
        strCiudad: "",
        strColonia: "",
        strEstado: "",
        strMunicipio: "",
      },

      mapDireccion_GPS_CentroA :{
        latitud : -17.3810618,
        longitud : -66.1550974,
      },
    },
    {
      strNombre_CentroA : 'Parque Kanata',
      strImage_CentroA : './assets/Images/lineDivider3.png',
      numId_Institucion : 1,

      mapContactos_CentroA : {
        arrCorreos_CentroA : [],
        strFacebook : "",
        strInstagram : "",
        strTelefono : "",
        strTikTok : "",
        strTwitter : "",
        strWhatsApp : "",
      },

      mapDireccion_Fisica_CentroA :{
        numCP:71295,
        numNumero_Exterior:12,
        numNumero_Interior:12,
        strCalle: "",
        strCiudad: "",
        strColonia: "",
        strEstado: "",
        strMunicipio: "",
      },

      mapDireccion_GPS_CentroA :{
        latitud : -17.4128145,
        longitud : -66.158299,
      },
    },
  ];

  @ViewChild('scrollElement') content!: IonContent;

  constructor(
    private acsC : ActionSheetController,
    private router : Router,
  ) {
    (mapboxgl as any).accessToken = environment.MAPBOX_KEY;
  }

  ngOnInit() {
  }

  async centerInteraction(_center : any, _id : number){

    const sheet = await this.acsC.create({
      backdropDismiss : false,
      mode : 'ios',
      header : '¿Qué acción deseas relizar?',
      subHeader : '- '+_center.title+' -',
      translucent : true,
      buttons : [
        {
          text: 'Ver en Mapa',
          icon: 'map',
          handler: () => {
            this.findCenter(_id);
            // console.log(_id);
          }
        },
        {
          text: 'Ver Información',
          icon: 'eye',
          handler: () => {
            this.goToDetails(_id);
          }
        },
        {
          text: 'Editar Información',
          icon: 'pencil',
          handler: () => {
            console.log('Conectando con Depinazul')
          }
        },
        {
          text: 'Eliminar Centro',
          icon: 'trash',
          handler: () => {
            console.log('Conectando con Depinazul')
          }
        },
        {
          text: 'Cancelar',
          role:'cancel',
          icon: 'close',
          cssClass: 'menu-border-top',
          handler: () => {
            console.log('Conectando con Depinazul')
          }
        },
      ]
    })

    await sheet.present();

  }

  // Map

  ionViewWillEnter(){
    if(!this.map){
      this.buildMap();
    }
  }

  buildMap(){

    this.map = new Map({
      container: 'mapbox',
      interactive : true,
      style: this.styleMap,
      zoom : 16.6,
      center: [
        this.campaignList[0].mapDireccion_GPS_CentroA.longitud,
        this.campaignList[0].mapDireccion_GPS_CentroA.latitud,
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

    this.campaignList.forEach(_marks => {
        const popup = new Popup().setHTML(`
          <ion-grid>
            <ion-row class="ion-justify-content-center">
              <ion-col size=12>
                <img src="./assets/Images/lineDivider4.png"
                  style="display: block;
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                  object-position: inherit;
                  border-radius: 50%;">
              </ion-col>
              <ion-col size=12>
                <h3 class="ion-text-center" style="margin-top: -0.1rem; margin-bottom: -0.2rem;">${_marks.strNombre_CentroA}</h3>
              </ion-col>
              <ion-col size=12>
                <img src="./assets/Images/lineDivider4.png"
                  style="display: block;
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                  object-position: inherit;
                  border-radius: 50%;">
              </ion-col>
            </ion-row>
          </ion-grid>`);
        popup.setMaxWidth('225px');
        new Marker({color:'red'}).setLngLat([_marks.mapDireccion_GPS_CentroA.longitud, _marks.mapDireccion_GPS_CentroA.latitud]).setPopup(popup).addTo(this.map);
      });
    this.map.resize();

  }


  findCenter(_id:number) {
    const marker = this.campaignList[_id];
    this.map.panTo({lat: marker.mapDireccion_GPS_CentroA.latitud, lng: marker.mapDireccion_GPS_CentroA.longitud});
    this.content.scrollToBottom();
  }

  // Center Interacions
  goToEdit(_id:number){}

  goToDetails(_id:number){
    this.router.navigate(['/center-details/', _id]);
  }

  deoleteCenter(_id:number){}

}
