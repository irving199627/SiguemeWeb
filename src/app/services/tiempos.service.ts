import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TiemposService {

  // info;
  index;
  intervalo;
  datos;
  dlng;
  dlat;
  a;
  c;
  d;
  objeto: Observable<any>;
  elemento: Observable<any>;
  dentroTaller: boolean;
  min = 0;
  seg = 0;
  hor = 0;
  ide;
  taller;
  constructor( private activatedRoute: ActivatedRoute,
               public db: AngularFireDatabase ) {
  }

  ejecuta( autobus ) {

  }
  rad(x) {
    return x * (Math.PI / 180 );
  }

  getDistancia (lat1, lon1, lat2, lon2, radio?, id?, index?) {

    const Lat1 = lat1 * Math.PI / 180;
    const Lon1 = lon1 * Math.PI / 180;
    const Lat2 = lat2 * Math.PI / 180;
    const Lon2 = lon2 * Math.PI / 180;
    this.d = 6378137 * Math.acos( Math.cos(Lat1) * Math.cos(Lat2) * Math.cos(Lon2 - Lon1) +
            Math.sin(Lat1) * Math.sin(Lat2));

    console.log( 'la distancia entre p1 y p2', this.d);
    if (this.d <= radio) {
      this.dentroTaller = true;
      // console.log(this.dentroTaller);
    } else {
      this.dentroTaller = false;
    }
  const items = this.db.object(`dispositivo/ATS/${ index }`);
  items.update({ taller: this.dentroTaller });

    switch (id) {
      case 'ato':
      this.elemento = this.db.object(`dispositivo/ATS/${ index }`).valueChanges();
      this.elemento.forEach( elemento => {
        this.dentroTaller = elemento.taller;
      });
      if (this.dentroTaller === true) {
        console.log(this.dentroTaller, this.obtenerTiempo());
      } else {
        console.log(this.dentroTaller, this.obtenerTiempo());
      }
      break;
    }
  }

  obtenerTiempo() {
    const time = new Date();
    return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
  }

  obtenerDistancia(autobus, lat, long, rad) {
    for (let index = 0; index < autobus.length; index++) {
      this.objeto = this.db.object(`dispositivo/ATS/${index}`).valueChanges();
      this.objeto.forEach(datos => {
        this.index = index;
        this.datos = datos;
          this.getDistancia(this.datos.lat, this.datos.lng, lat, long, rad, this.datos.id, this.index);
      });
    }
  }
}
