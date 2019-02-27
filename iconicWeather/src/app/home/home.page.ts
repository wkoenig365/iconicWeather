import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';

@Component( {
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
} )
export class HomePage implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  constructor ( ) {
  }
  layersControl = {
    baseLayers: {
      'Dark Base Map': L.tileLayer( 'https://cartodb-basemaps-1.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', { attribution: '...' } ),
      'Level 2 Radar': L.tileLayer( 'http://198.74.59.47/new/{z}/{x}/{y}.png', { attribution: '...' } )
    },
    overlays: {
      // tslint:disable-next-line:max-line-length
      'Level 2 Radar': L.tileLayer( 'http://198.74.59.47/new/{z}/{x}/{y}.png', { tms: true, opacity: .5, attribution: '...' } ),
      // tslint:disable-next-line:max-line-length
      'MRMS Merged': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/MERGEDREF/{z}/{x}/{y}.png', { opacity: .8, attribution: '...' } ),
      // tslint:disable-next-line:max-line-length
      'GOES 16 Low Level WV': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/G16-ABI-CONUS-BAND10-VAPR/{z}/{x}/{y}.png', { opacity: .5, attribution: '...' } )
    }
  };
  ionViewDidEnter() {
    this.loadmap();
  }
  loadmap() {
    this.map = L.map('map').setView(L.latLng( 40, -95 ), 5);
    const darkmap = L.tileLayer('https://cartodb-basemaps-1.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
      attribution: '...',
      maxZoom: 18
    } ).addTo( this.map );
    const baseLayers = {
      'Dark Map': darkmap
    };
    const overlays = {
      // tslint:disable-next-line:max-line-length
      'Level 2 Radar': L.tileLayer( 'http://198.74.59.47/new/{z}/{x}/{y}.png', { tms: true, opacity: .5, attribution: '...' } ),
      // tslint:disable-next-line:max-line-length
      'MRMS Merged': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/MERGEDREF/{z}/{x}/{y}.png', { opacity: .8, attribution: '...' } ),
      // tslint:disable-next-line:max-line-length
      'GOES 16 Low Level WV': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/G16-ABI-CONUS-BAND10-VAPR/{z}/{x}/{y}.png', { opacity: .5, attribution: '...' } ),
      // tslint:disable-next-line:max-line-length
      'GOES 16 Mid Level WV': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/G16-ABI-CONUS-BAND09-VAPR/{z}/{x}/{y}.png', { opacity: .5, attribution: '...' } ),
      // tslint:disable-next-line:max-line-length
      'GOES 16 Upper Level WV': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/G16-ABI-CONUS-BAND08-VAPR/{z}/{x}/{y}.png', { opacity: .5, attribution: '...' } ),
      // tslint:disable-next-line:max-line-length
      'GOES 16 True Color': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/G16-ABI-CONUS-TC/{z}/{x}/{y}.png', { opacity: .5, attribution: '...' } ),
      // tslint:disable-next-line:max-line-length
      'GOES 17 Low Level WV': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/G17-ABI-CONUS-BAND10-VAPR/{z}/{x}/{y}.png', { opacity: .5, attribution: '...' } ),
      // tslint:disable-next-line:max-line-length
      'GOES 17 Mid Level WV': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/G17-ABI-CONUS-BAND09-VAPR/{z}/{x}/{y}.png', { opacity: .5, attribution: '...' } ),
      // tslint:disable-next-line:max-line-length
      'GOES 17 Upper Level WV': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/G17-ABI-CONUS-BAND08-VAPR/{z}/{x}/{y}.png', { opacity: .5, attribution: '...' } ),
      // tslint:disable-next-line:max-line-length
      'Estimated Bulk Wind Shear': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/EBSPS/{z}/{x}/{y}.png', { opacity: .5, attribution: '...' } )
    };
    L.control.layers(baseLayers, overlays).addTo(this.map);
  }

  ngOnInit () {
  }
  ngAfterViewCheck() {
    this.map.invalidateSize();
}
}
