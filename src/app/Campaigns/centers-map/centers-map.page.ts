import { Component, OnInit, ViewChild } from '@angular/core';

import { Map } from 'mapbox-gl';
import { Popup, Marker } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment.prod';
import { MapServiceService } from '../../Services/map-service.service';
import { IonSlides } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

interface centerMarker {
  lat: number,
  long:number,
  title?: string,
  subtitle?: string,
  image?: string,
}

@Component({
  selector: 'app-centers-map',
  templateUrl: './centers-map.page.html',
  styleUrls: ['./centers-map.page.scss'],
})
export class CentersMapPage implements OnInit {

  @ViewChild(IonSlides)
  slides!: IonSlides;

  public map !: mapboxgl.Map;
  // public styleMap = 'mapbox://styles/mapbox/streets-v12';
  public styleMap = 'mapbox://styles/mapbox/outdoors-v12';

  latitude : any;
  longitude : any;

  idCampaing : string = '0';

  centerMarkers: centerMarker[] = [
    {
      lat: -17.386378,
      long: -66.1628018,
      title: 'Parque De la Familia',
      image: './assets/Images/lineDivider3.png',
    },
    {
      lat: -17.4005556,
      long: -66.1741667,
      title: 'Mariscal Santa Cruz',
      image: './assets/Images/lineDivider3.png',
    },
    {
      lat: -17.3810618,
      long: -66.1550974,
      title: 'Parque de Educación Vial',
      image: './assets/Images/lineDivider3.png',
    },
    {
      lat: -17.4128145,
      long: -66.158299,
      title: 'Parque Kanata',
      image: './assets/Images/lineDivider3.png',
    }
  ];

  constructor(
    private mapS : MapServiceService,
    private ar : ActivatedRoute,
    private router : Router,
  ) {
    (mapboxgl as any).accessToken = environment.MAPBOX_KEY;

    this.ar.params.subscribe(
      (_id:any)=>{
        this.idCampaing = _id.id;
        // console.log(this.idCampaing);
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
    this.longitude = this.mapS.locations[0];
    this.latitude = this.mapS.locations[1];
    // console.log(this.longitude, this.latitude)
    let currentMark : centerMarker = {
      lat: this.mapS.locations[0],
      long: this.mapS.locations[1],
      title: 'Depinazul',
      subtitle: 'Usted Abrio el Mapa Aqui',
      image: './assets/Images/pilotProfile.jpeg',
    }

    this.centerMarkers.unshift(currentMark)

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
                <img src="${_marks.image}"
                  style="display: block;
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                  object-position: inherit;
                  border-radius: 50%;">
              </ion-col>
              <ion-col size=12>
                <h3 class="ion-text-center" style="margin-top: -0.1rem; margin-bottom: -0.2rem;">${_marks.title}</h3>
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
        new Marker({color:'red'}).setLngLat([_marks.long, _marks.lat]).setPopup(popup).addTo(this.map);
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
    this.map.panTo({lat: marker.lat, lng: marker.long});
  }

  viewMap(_id:string){
    this.router.navigate(['/centers-map/',_id]);
  }

}
