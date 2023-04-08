import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonContent } from '@ionic/angular';

import { Map } from 'mapbox-gl';
import { Popup, Marker } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment.prod';
import { Router } from '@angular/router';
import CentroAcopio from '../../../Interfaces/CentroAcopio.interface';
import { CenterControlServiceService } from 'src/app/Services/center-control-service.service';
import { AlertsToastServiceService } from 'src/app/Services/alerts-toast-service.service';
import { MapServiceService } from 'src/app/Services/map-service.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-mi-centers',
  templateUrl: './mi-centers.page.html',
  styleUrls: ['./mi-centers.page.scss'],
})

export class MiCentersPage implements OnInit {

  public centersMap !: mapboxgl.Map;
  public styleMap = 'mapbox://styles/mapbox/outdoors-v12';

  centerList: CentroAcopio[] = [];

  // SearchBar
  filterTerm: string = '';

  @ViewChild('scrollElement') content!: IonContent;

  constructor(
    private acsC : ActionSheetController,
    private router : Router,
    private centerS : CenterControlServiceService,
    private alertS : AlertsToastServiceService,
    private mapS : MapServiceService
  ) {
    (mapboxgl as any).accessToken = environment.MAPBOX_KEY;
    this.centerS.getCenters().subscribe(
      (_centers: any)=>{
        // console.log(_centers);
        this.centerList = _centers;
      }
    )
  }

  async centerInteraction(_center : any, _id : number){

    const sheet = await this.acsC.create({
      backdropDismiss : false,
      mode : 'ios',
      header : '¿Qué acción deseas relizar?',
      subHeader : '- '+_center.strNombre_CentroA+' -',
      translucent : true,
      buttons : [
        {
          text: 'Consultar Detalles',
          icon: 'eye',
          handler: () => {
            this.goToDetails(_center.id);
          }
        },
        {
          text: 'Editar Información',
          icon: 'pencil',
          handler: () => {
            this.goToEdit(_center.id);
          }
        },
        {
          text: 'Ubicar en Mapa',
          icon: 'map',
          handler: () => {
            this.findCenter(_id);
            // console.log(_id);
          }
        },
        {
          text: 'Eliminar Centro',
          icon: 'trash',
          handler: () => {
            this.deleteCenter(_center);
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

  ngOnInit(){
    this.centerS.getCenters().subscribe(
      (_centers: any)=>{
        console.log(_centers);
        this.centerList = _centers;
        this.buildMap(this.centerList);
      }
    )
  }

  buildMap(_centers:CentroAcopio[]){

    if (_centers.length > 0) {

      this.centersMap = new Map({
        container: 'mapboxAllCenters',
        interactive : true,
        style: this.styleMap,
        zoom : 16.6,
        center: [
          _centers[0].mapDireccion_GPS_CentroA.longitud,
          _centers[0].mapDireccion_GPS_CentroA.latitud,
        ]
      });

      this.centersMap.addControl(new mapboxgl.NavigationControl());
      this.centersMap.addControl(new mapboxgl.FullscreenControl());
      this.centersMap.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }));

      this.centerList.forEach((_marks:CentroAcopio) => {

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
              <h4 class="ion-text-center" style="margin-top: -0.1rem; margin-bottom: -0.2rem;">${_marks.strNombre_CentroA}</h4>
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

        new Marker({color:'red'}).setLngLat([_marks.mapDireccion_GPS_CentroA.longitud, _marks.mapDireccion_GPS_CentroA.latitud]).setPopup(popup).addTo(this.centersMap);
      });

      this.centersMap.resize();
    }
  }

  findCenter(_id:number) {
    const marker = this.centerList[_id];
    this.centersMap.panTo({lat: marker.mapDireccion_GPS_CentroA.latitud, lng: marker.mapDireccion_GPS_CentroA.longitud});
  }

  // Center Interacions

  goToEdit(_id:string){
    this.router.navigate(['/create-center/', _id]);
  }

  goToDetails(_id:string){
    this.router.navigate(['/center-details/', _id]);
  }

  deleteCenter(_center:CentroAcopio){
    this.alertS.confirm('Eliminar','¿Deseas eliminar a ' + _center.strNombre_CentroA + ' de la Lista?').then(
      async (resp:any) => {
        if(resp.data === true){

          const response = await this.centerS.deleteCenter(_center);
          this.alertS.deleteToast('Centros de Acopio');
          // this.centersMap.panTo({lat: this.mapS.locations[0], lng: this.mapS.locations[1]});

        }
      }
    );
  }

}
