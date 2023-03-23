import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { PositionOptions } from 'mapbox-gl';
import { MapServiceService } from './Services/map-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    protected plataform : Platform,
    private mapS : MapServiceService
  ) {
    // this.plataform.ready().then(async () => {
      this.getGeoLocation();
    // })
  }

  async getGeoLocation() {
    const coordinates = await Geolocation.getCurrentPosition()
      .then((resp) => {
        console.log(resp);
        this.mapS.locations = [
          resp.coords.latitude,
          resp.coords.longitude,
        ]
      }).catch((error) => {
          console.log('Error getting location', error);
      });
  }

}
