import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import * as J from 'jquery';

@Component( {
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
} )
export class HomePage implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  URLlink = '';
  constructor () {
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
  ionViewDidEnter (URLlink) {
    $.get('http://198.74.59.47:8080/thredds/catalog/GOES16ConusCH08/latest.html', function(response) {
      // $('a[href*="latest.html?"]').each(function() {
      //   // tslint:disable-next-line:prefer-const
      //   let fileName = response;
      // });
      URLlink = $( 'a[href*="/latest.html?/"]' ).attr( 'href' );
      this.loadmap(URLlink);
    } );
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
      'nexrad': L.tileLayer.wms('http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi', {
        layers: 'nexrad-n0r-900913',
        format: 'image/png',
        transparent: true,
        attribution: 'Weather data © 2012 IEM Nexrad'
        }),
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
      'Estimated Bulk Wind Shear': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/EBSPS/{z}/{x}/{y}.png', { opacity: .5, attribution: '...' } ),
      // tslint:disable-next-line:max-line-length
      'My Goes': L.tileLayer.wms('http://198.74.59.47:8080/thredds/wms/GOES16ConusCH08/newest.nc', {
        layers: 'Rad',
        version: '1.3.0',
        format: 'image/png',
        transparent: true,
        opacity: .5,
        attribution: '...'} )
    };
    L.control.layers(baseLayers, overlays).addTo(this.map);
  }

  ngOnInit () {

  }
  ngAfterViewCheck() {
    this.map.invalidateSize();
}
}
