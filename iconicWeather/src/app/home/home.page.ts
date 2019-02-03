import { Platform } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions
} from '@ionic-native/google-maps';
import { Component } from '@angular/core';

export class HomePage {
  @Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
  })

  map: GoogleMap;

  constructor(private platform: Platform) {
    platform.ready().then(() => {
      this.loadMap();
    })
  }

  loadMap() {

    const options: GoogleMapOptions = {
      controls: {
        compass: true,
        myLocation: true,
        myLocationButton: true,
        mapToolbar: true
      }
    };
    this.map = GoogleMaps.create('map_canvas', options);
  }
}
