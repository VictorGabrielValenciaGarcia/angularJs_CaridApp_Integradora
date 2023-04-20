import { Component, OnInit, ViewChild } from '@angular/core';

import { Map } from 'mapbox-gl';
import { Popup, Marker } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment.prod';
import { MapServiceService } from '../../../Services/map-service.service';
import { IonSlides } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import CentroAcopio from '../../../Interfaces/CentroAcopio.interface';
import { Contacto } from '../../../Interfaces/CentroAcopio.interface';
import { CenterControlServiceService } from 'src/app/Services/center-control-service.service';

@Component({
  selector: 'app-centers-map',
  templateUrl: './check-centers.page.html',
  styleUrls: ['./check-centers.page.scss'],
})
export class CheckCentersPage implements OnInit {

  @ViewChild(IonSlides)
  slides!: IonSlides;

  public map !: mapboxgl.Map;
  // public styleMap = 'mapbox://styles/mapbox/streets-v12';
  public styleMap = 'mapbox://styles/mapbox/outdoors-v12';

  latitude : any;
  longitude : any;
  idCampaing : string = '';
  centerMarkers: CentroAcopio[] = [];

  constructor(
    private mapS : MapServiceService,
    private centerS : CenterControlServiceService,
    private ar : ActivatedRoute,
    private router : Router,
  ) {
    (mapboxgl as any).accessToken = environment.MAPBOX_KEY;
  }

  ngOnInit() {
    this.ar.params.subscribe(
      (_id:any)=>{
        this.idCampaing = _id.id;
        this.centerS.getCenters().subscribe(
          _centers => {
            this.centerMarkers = _centers;
            // console.log(_centers);

              // if(!this.map){
            this.buildMap();
              // }
          }
        )
        // console.log(this.idCampaing);
      }
    )
  }

  buildMap(){
    this.longitude = this.mapS.locations[0];
    this.latitude = this.mapS.locations[1];

    let currentMark : CentroAcopio =     {
      strNombre_CentroA : 'Depinazul',
      strSubtitulo_CentroA : 'Usted Abrio el Mapa Aqui',
      strImage_CentroA : './assets/Images/lineDivider3.png',
      numId_Institucion : '0',

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
        longitud : this.mapS.locations[1],
        latitud : this.mapS.locations[0],
      },
    };

    this.centerMarkers.unshift(currentMark)
    // console.log(this.centerMarkers);


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
    this.currentPositionMark(this.longitude,this.latitude);
    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    this.centerMarkers.forEach(_marks => {
        const popup = new Popup().setHTML(`
          <ion-grid>
            <ion-row class="ion-justify-content-center">
              <ion-col size=12>
                <img src="${_marks.strImage_CentroA}"
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

  currentPositionMark(_lng:number, _lat:number){
    const marker = new Marker({color: "red",})
      .setLngLat([_lat,_lng])
      .addTo(this.map);
  }

  async onSlideDidChange() {
    const currentSlide = await this.slides.getActiveIndex();
    const marker = this.centerMarkers[currentSlide];
    this.map.panTo({lat: marker.mapDireccion_GPS_CentroA.latitud, lng: marker.mapDireccion_GPS_CentroA.longitud});
  }

  viewMap(_id:string){
    this.router.navigate(['/centers-map/',_id]);
  }

}
