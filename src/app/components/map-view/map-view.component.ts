import {Component, Input, AfterViewInit} from '@angular/core';
import {Game} from "../../../models/models";
import * as leaflet from 'leaflet';

@Component({
  selector: 'map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {
  @Input() games: Game[];
  @Input() currentLocation: GeolocationPosition;
  map: leaflet.Map;
  markers: leaflet.Marker[];
  loading: boolean = false;

  constructor() {
  }

  initMap() {
    this.loading = true;
    this.map = leaflet.map('map', {
      center: this.currentLocation ? [this.currentLocation.coords.latitude, this.currentLocation.coords.longitude]: [39.108733299159994, -84.44945150819291],
      zoom: 3,
    });

    const tiles = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    const markers = this.getMarkers();
    markers.forEach(m => m.addTo(this.map));
    this.loading = false;
  }


  ngAfterViewInit() {
    this.initMap();
  }

  getMarkers(): leaflet.Marker[] {
    const icon = new leaflet.Icon({
      iconUrl: '../../assets/leaflet/marker-icon.png',
      iconRetinaUrl: '../../assets/leaflet/marker-icon-2x.png',
      shadowUrl: '../../assets/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });

    const gamesWithLocations = this.games.filter(g => g.Location.Longitude && g.Location.Latitude);
    // const locationGroups: object = {};
    //
    // gamesWithLocations.forEach(g => {
    //     if (locationGroups[g.Location.Description]) {
    //       locationGroups[g.Location.Description].push(g);
    //     } else if (g.Location.Description) {
    //       locationGroups[g.Location.Description] = [g];
    //     } else {
    //       const matchingLocationsWithDescs = gamesWithLocations.filter(gameWLoc => gameWLoc.Location.Latitude === g.Location.Latitude && gameWLoc.Location.Longitude === g.Location.Longitude && gameWLoc.Location.Description);
    //
    //       // just take the first one i guess?
    //       if (matchingLocationsWithDescs.length) {
    //         locationGroups[matchingLocationsWithDescs[0].Location.Description] = [g];
    //       } else {
    //         locationGroups[`${g.Location.Latitude}${g.Location.Longitude}`] = [g];
    //       }
    //     }
    //   }
    // )
    //
    // const m2 = Object.entries(locationGroups).map(([description, games]) => {
    //   const marker = leaflet.marker(games[0].Location.latLng as leaflet.LatLngExpression, {icon});
    //   marker.bindPopup(this.getPopupContent(games));
    // });

    const markers = gamesWithLocations.filter(g => g.Location.Longitude && g.Location.Latitude)
      .map(g => {
        const marker = leaflet.marker(g.Location.latLng as leaflet.LatLngExpression, {icon});
        marker.bindPopup(this.getPopupContent(g));

        return marker;
      });

    return markers;
  }

  getPopupContent(game: Game): string {
    return `
            <div>
                <div style="font-weight: bold">
                    ${game.displayDate} ${game.Location.Description ? '- ' + game.Location.Description : ''}
                </div>
                <p>
                    ${game.WinningTeam.Players[0].Name}/${game.WinningTeam.Players[1].Name}: ${game.WinningTeam.Score}
                    <br />
                    ${game.LosingTeam.Players[0].Name}/${game.LosingTeam.Players[1].Name}: ${game.LosingTeam.Score}
                </p>
            </div>`
  }

}
