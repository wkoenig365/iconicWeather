import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  constructor() {
  }
  ionViewDidEnter() {
    this.loadmap();
  }
  loadmap() {
    this.map = L.map('map').fitWorld();
    L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '...',
      maxZoom: 18
    }).addTo(this.map);
  }
}
