import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import * as L from 'leaflet';
import '@asymmetrik/ngx-leaflet'
import * as J from 'jquery';
import '../../../node_modules/leaflet-timedimension/dist/leaflet.timedimension.src.js';
// /home/willy/reps/iconicWeather/iconicWeather/node_modules/leaflet-timedimension/src/leaflet.timedimension.js

declare const L: any;

@Component( {
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
} )
  // , "https://cdn.rawgit.com/nezasa/iso8601-js-period/master/iso8601.min.js", "https://cdn.rawgit.com/socib/Leaflet.TimeDimension/master/dist/leaflet.timedimension.min.js" 
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
  ionViewDidEnter () {
    this.loadmap();
  }
  loadmap () {
    var endDate = new Date();
    //endDate.setUTCMinutes(0, 0, 0);
    this.map = L.map( 'map', { timeDimension: true,
      timeDimensionControl: true} ).setView( L.latLng( 40, -95 ), 5 );
    // this.map = L.map('map', {
    //   fullscreenControl: true,
    //   timeDimension: true,
    //   timeDimensionControl: true,
    //   timeDimensionOptions:{
    //       timeInterval: "PT4H/" + endDate.toISOString(),
    //       period: "PT4M",
    //       currentTime: endDate
    //   },    
      
    //   timeDimensionControlOptions: {
    //       autoPlay: false,
    //       playerOptions: {
    //           buffer: 10,
    //           transitionTime: 250,
    //           loop: true,
    //       }
    //   }
    // } ).setView( L.latLng( 40, -95 ), 5 );
    
    const darkmap = L.tileLayer('https://cartodb-basemaps-1.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
      attribution: '...',
      maxZoom: 18
    } ).addTo( this.map );

    const baseLayers = {
      'Dark Map': darkmap
    };

    // const overlays = {
    //   // tslint:disable-next-line:max-line-length
    //   'Level 2 Radar': L.tileLayer( 'http://198.74.59.47/new/{z}/{x}/{y}.png', { tms: true, opacity: .5, attribution: '...' } ),
    //   'nexrad': L.tileLayer.wms('http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi', {
    //     layers: 'nexrad-n0r-900913',
    //     format: 'image/png',
    //     transparent: true,
    //     attribution: 'Weather data © 2012 IEM Nexrad'
    //     }),
    //   // tslint:disable-next-line:max-line-length
    //   'MRMS Merged': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/MERGEDREF/{z}/{x}/{y}.png', { opacity: .8, attribution: '...' } ),
    //   // tslint:disable-next-line:max-line-length
    //   'GOES 16 Low Level WV': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/G16-ABI-CONUS-BAND10-VAPR/{z}/{x}/{y}.png', { opacity: .5, attribution: '...' } ),
    //   // tslint:disable-next-line:max-line-length
    //   'GOES 16 Mid Level WV': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/G16-ABI-CONUS-BAND09-VAPR/{z}/{x}/{y}.png', { opacity: .5, attribution: '...' } ),
    //   // tslint:disable-next-line:max-line-length
    //   'GOES 16 Upper Level WV': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/G16-ABI-CONUS-BAND08-VAPR/{z}/{x}/{y}.png', { opacity: .5, attribution: '...' } ),
    //   // tslint:disable-next-line:max-line-length
    //   'GOES 16 True Color': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/G16-ABI-CONUS-TC/{z}/{x}/{y}.png', { opacity: .5, attribution: '...' } ),
    //   // tslint:disable-next-line:max-line-length
    //   'GOES 17 Low Level WV': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/G17-ABI-CONUS-BAND10-VAPR/{z}/{x}/{y}.png', { opacity: .5, attribution: '...' } ),
    //   // tslint:disable-next-line:max-line-length
    //   'GOES 17 Mid Level WV': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/G17-ABI-CONUS-BAND09-VAPR/{z}/{x}/{y}.png', { opacity: .5, attribution: '...' } ),
    //   // tslint:disable-next-line:max-line-length
    //   'GOES 17 Upper Level WV': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/G17-ABI-CONUS-BAND08-VAPR/{z}/{x}/{y}.png', { opacity: .5, attribution: '...' } ),
    //   // tslint:disable-next-line:max-line-length
    //   'Estimated Bulk Wind Shear': L.tileLayer( 'http://realearth.ssec.wisc.edu/tiles/EBSPS/{z}/{x}/{y}.png', { opacity: .5, attribution: '...' } ),
    //   // tslint:disable-next-line:max-line-length
    //   'My Goes 16 Ch. 08': L.tileLayer.wms('http://198.74.59.47:8080/thredds/wms/GOES16ConusCH08/newest.nc', {
    //     layers: 'Rad',
    //     version: '1.3.0',
    //     format: 'image/png',
    //     transparent: true,
    //     opacity: .5,
    //     attribution: '...'
    //   } ),
    //   'RTMA 2m Temp': L.timeDimension.tileLayer.wms('http://198.74.59.47:8080/thredds/wms/rtmaSurface/newest_rtma_surface.grb2?COLORSCALERANGE=270,311', {
    //     layers: 'Temperature_height_above_ground',
    //     version: '1.3.0',
    //     format: 'image/png',
    //     styles: 'boxfill/occam',
    //     transparent: true,
    //     opacity: .5,
    //     attribution: '...'
    //   } ),
    //   'RTMA 2m Dewpoint': L.tileLayer.wms('http://198.74.59.47:8080/thredds/wms/rtmaSurface/newest_rtma_surface.grb2?COLORSCALERANGE=250,305', {
    //     layers: 'Dewpoint_temperature_height_above_ground',
    //     version: '1.3.0',
    //     format: 'image/png',
    //     styles: 'boxfill/occam',
    //     transparent: true,
    //     opacity: .5,
    //     attribution: '...'
    //   } ),
    //   'RTMA 10m Wind (vector)': L.tileLayer.wms('http://198.74.59.47:8080/thredds/wms/rtmaSurface/newest_rtma_surface.grb2?COLORSCALERANGE=0,15', {
    //     layers: 'wind @ Specified height level above ground',
    //     version: '1.3.0',
    //     format: 'image/png',
    //     styles: 'vector/ferret',
    //     transparent: true,
    //     opacity: .5,
    //     attribution: '...'
    //   } ),
    //   'RTMA 10m Wind (boxfill)': L.tileLayer.wms('http://198.74.59.47:8080/thredds/wms/rtmaSurface/newest_rtma_surface.grb2?COLORSCALERANGE=0,15', {
    //     layers: 'wind @ Specified height level above ground',
    //     version: '1.3.0',
    //     format: 'image/png',
    //     styles: 'boxfill/ferret',
    //     transparent: true,
    //     opacity: .5,
    //     attribution: '...'
    //   } )
    // };

    //L.control.layers( baseLayers, overlays ).addTo( this.map );
    
    const options = {
      zoom: 4,
      center: L.latLng([ 46.879966, -121.726909 ]),
      timeDimension: true,
      timeDimensionControl: true
    };
  
    // const baseLayer = L.tileLayer.wms('https://ogcie.iblsoft.com/metocean/wms', {
    //   layers: 'foreground-lines',
    //   format: 'image/png',
    //   transparent: true,
    //   crs: L.CRS.EPSG4326
    // });
  
    var wmsUrl = "https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WMSServer"
    var dataLayer = L.tileLayer.wms(wmsUrl, {
        layers: '1',
        version: '1.3.0',
        format: 'image/png',
        transparent: true,
        opacity: 0.8,
        attribution: 'nowCOAST'
    });
  
    const tdWmsLayer = L.timeDimension.layer.wms( dataLayer ).addTo( this.map );
    //console.log(L.timeDimension.getAvailableTimes());
    
    const layers = [
      tdWmsLayer
    ];

    // L.options.addTo( this.map );
    // L.layers( dataLayer ).addTo(this.map)

  }

  ngOnInit () {

  }
  ngAfterViewCheck() {
    this.map.invalidateSize();
}
}
