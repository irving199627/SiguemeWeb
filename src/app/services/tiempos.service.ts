import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TiemposService {
  d;
  constructor( private activatedRoute: ActivatedRoute,
               public db: AngularFireDatabase ) {
  }

  rad(x) {
    return x * (Math.PI / 180 );
  }

  getDistancia (lat1, lon1, lat2, lon2, radioTaller) {

    const Lat1 = lat1 * Math.PI / 180;
    const Lon1 = lon1 * Math.PI / 180;
    const Lat2 = lat2 * Math.PI / 180;
    const Lon2 = lon2 * Math.PI / 180;
    this.d = 6378137 * Math.acos( Math.cos(Lat1) * Math.cos(Lat2) * Math.cos(Lon2 - Lon1) +
            Math.sin(Lat1) * Math.sin(Lat2));
    if (this.d < radioTaller) {
      return true;
    } else {
      return false;
    }
  }
}
