import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import CentroAcopio from 'src/app/Interfaces/CentroAcopio.interface';

import { Map } from 'mapbox-gl';
import { Marker } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment.prod';
import { CenterControlServiceService } from 'src/app/Services/center-control-service.service';

@Component({
  selector: 'app-center-details',
  templateUrl: './center-details.page.html',
  styleUrls: ['./center-details.page.scss'],
})

export class CenterDetailsPage implements OnInit {

  public mapCenter !: mapboxgl.Map;
  public styleMap = 'mapbox://styles/mapbox/outdoors-v12';

  id : any;

  center : any = {};

  constructor(
    private ar : ActivatedRoute,
    private centerS : CenterControlServiceService,
    private router : Router
  ) {

    (mapboxgl as any).accessToken = environment.MAPBOX_KEY;

  }

  ngOnInit() {
  }

  ionViewWillEnter(){

    this.ar.params.subscribe(
      (_id:any)=>{
        this.id =_id.id;

          this.centerS.getCenterById(this.id).subscribe(
            (_center : any) => {
              console.log(_center);
              this.center = _center;
              this.buildMap(this.center);
            }
          );
      }
    )

  }

  buildMap(_centers:CentroAcopio){
    this.mapCenter = new Map({
      container: 'mapOfCenter',
      interactive : true,
      style: this.styleMap,
      zoom : 16.6,
      center: [
        _centers.mapDireccion_GPS_CentroA.longitud,
        _centers.mapDireccion_GPS_CentroA.latitud,
      ]
    });

    this.mapCenter.addControl(new mapboxgl.NavigationControl());
    this.mapCenter.addControl(new mapboxgl.FullscreenControl());
    this.mapCenter.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    new Marker({color:'red'}).setLngLat([_centers.mapDireccion_GPS_CentroA.longitud, _centers.mapDireccion_GPS_CentroA.latitud]).addTo(this.mapCenter);
    this.mapCenter.resize();

  }

  goToEdit(_id:string){
    this.router.navigate(['/create-center/', _id]);
  }

}
