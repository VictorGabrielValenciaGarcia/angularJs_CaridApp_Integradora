import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import CentroAcopio from 'src/app/Interfaces/CentroAcopio.interface';

import { Map } from 'mapbox-gl';
import { Marker } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-center-details',
  templateUrl: './center-details.page.html',
  styleUrls: ['./center-details.page.scss'],
})

export class CenterDetailsPage implements OnInit {

  public map !: mapboxgl.Map;
  public styleMap = 'mapbox://styles/mapbox/outdoors-v12';

  id : any;

  centerP : CentroAcopio = {
    strNombre_CentroA : 'Parque De la Familia',
    strImage_CentroA : 'https://www.oaxaca.gob.mx/comunicacion/wp-content/uploads/sites/28/2020/11/Tonameca-UBR.jpeg',
    numId_Institucion : 1,

    mapContactos_CentroA : {
      arrCorreos_CentroA : [
        {
          strCorreo : 'vgabriel.valencia@gmail.com',
          strDepartamento : 'Servicos Humanos',
          strEncargado : 'Victor Gabriel Valencia García',
          strTelefono_Departamento : '951-544-3461'
        },
        {
          strCorreo : 'vgabriel.valencia@gmail.com',
          strDepartamento : 'Vinculación',
          strEncargado : 'Victor Gabriel Valencia García',
          strTelefono_Departamento : '951-544-3461'
        },
      ],
      strFacebook : "@Depinazul",
      strInstagram : "@Depinazul",
      strTelefono : "951-459-0568",
      strTikTok : "Ninguno",
      strTwitter : "@Depinazul",
      strWhatsApp : "951-459-0568",
    },

    mapDireccion_Fisica_CentroA :{
      strCalle: "Comaltepec",
      numNumero_Exterior:7,
      strColonia: "Fracc. Reyes Mantecon",
      strCiudad: "Reyes Mantecon",
      strMunicipio: "San Bartolo Coyotepec",
      numCP:71295,
      numNumero_Interior:7,
      strEstado: "Oaxaca",
    },

    mapDireccion_GPS_CentroA :{
      latitud : -17.386378,
      longitud: -66.1628018,
    },
  };

  constructor(
    private ar : ActivatedRoute
  ) {

    (mapboxgl as any).accessToken = environment.MAPBOX_KEY;

    this.ar.params.subscribe(
      (_id:any)=>{
        this.id =_id.id;
      }
    )
  }

  ngOnInit() {
  }

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
        this.centerP.mapDireccion_GPS_CentroA.longitud,
        this.centerP.mapDireccion_GPS_CentroA.latitud,
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

    new Marker({color:'red'}).setLngLat([this.centerP.mapDireccion_GPS_CentroA.longitud, this.centerP.mapDireccion_GPS_CentroA.latitud]).addTo(this.map);
    this.map.resize();

  }

}
