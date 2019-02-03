import { Component, OnInit, Renderer, ChangeDetectorRef, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { transformExtent } from 'ol/proj.js';
import Stamen from 'ol/source/stamen';
import OSM from 'ol/source/osm';
import LayerGroup from 'ol/layer/group';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public renderer: Renderer, private cdr: ChangeDetectorRef) {
  }
map: Map;
source: XYZ;
layer: TileLayer;
view: View;
// tslint:disable-next-line:use-life-cycle-interface
ngAfterViewInit () {
  const extent = transformExtent( [-126, 24, -66, 50], 'EPSG:4326', 'EPSG:3857' );

    this.source = new XYZ({
      url: 'https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/{z}/{x}/{y}.png'
    } );

    this.view = new View({
      center: extent,
      zoom: 5
    } );

    this.map = new Map({
      target: 'map',
      layers: [
        new LayerGroup( {
          layers: [
            new TileLayer( {
              source: new OSM()
            } ),
            new TileLayer({
              source: this.source
            } )
          ]
        })
      ],
      view: this.view
    } );

    this.cdr.detectChanges();
    this.map.render();
}
}
