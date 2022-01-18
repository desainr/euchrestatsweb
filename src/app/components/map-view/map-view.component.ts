import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Game} from "../../../models/models";
import {map} from "rxjs/operators";
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";

@Component({
  selector: 'map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent {
  @Input() games: Game[];
  @Input() currentLocation: GeolocationPosition;
  @ViewChild('googleMap') googleMapComponent: GoogleMap;
  center: google.maps.LatLngLiteral = {lat: 39, lng: -81};
  zoom = 5;
  display:google.maps.LatLngLiteral = {lat: 39, lng: -81};
  markerOptions: google.maps.MarkerOptions = {draggable: false};

  constructor() {}

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = event.latLng ? (event.latLng.toJSON()) : this.center;
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng ? event.latLng.toJSON() : this.display;
  }

  openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker);
  }
}
