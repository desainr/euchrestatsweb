import {Injectable} from "@angular/core";
import {Location} from "../models/models";
import {Observable} from "rxjs";

@Injectable()
export class LocationService {
  constructor() {}

  getLocation(): Observable<GeolocationPosition> {

    return new Observable((subscriber) => {
      navigator.geolocation.getCurrentPosition((location) => subscriber.next(location))
    })
  }
}
