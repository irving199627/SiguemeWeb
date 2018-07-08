import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TiemposService {

  // info;
  intervalo;
  datos;
  dlng;
  dlat;
  a;
  c;
  d;
  objeto: Observable<any>;
  dentroTaller: boolean;
  min = 0;
  seg = 0;
  hor = 0;
  ide;
  tiempo;
  taller;
  constructor( private activatedRoute: ActivatedRoute,
               public db: AngularFireDatabase ) {
  }

  ejecuta( autobus ) {
    // console.log(autobus);
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

    // items.valueChanges().forEach(element => {
    //   console.log('elemento', element);
    // });
    switch (id) {
      case 'ato':
      items.valueChanges().forEach( elemento => {
        this.dentroTaller = elemento.taller;
        console.log(elemento);
      });
      if (this.dentroTaller === true) {
       this.intervalo = setInterval(() => {
          this.seg += 1;
          if (this.seg === 60) {
            this.seg = 0;
            this.min += 1;
          }
          // console.log('tiempo' + this.min + ':' + this.seg );
          this.tiempo = this.min + ':' + this.seg;
          items.update({ horasTaller: this.tiempo });
        }, 1000);
      } else {
        clearInterval(this.intervalo);
        console.log(this.tiempo);
      }
      break;
    }

    // const prueba = this.db.list(`dispositivo/ATS/${index}`, ref => ref.orderByValue().equalTo(true)).valueChanges();
    // prueba.forEach(element => {
    //   console.log(element);
    // });
  }

  obtenerDistancia(autobus, lat, long, rad) {
    for (let index = 0; index < autobus.length; index++) {
      // console.log(autobus[index], index);
      this.objeto = this.db.object(`dispositivo/ATS/${index}`).valueChanges();
      this.objeto.forEach(datos => {
        // console.log(datos.lat);
        this.datos = datos;
      });
      setTimeout(() => {
        this.getDistancia(this.datos.lat, this.datos.lng, lat, long, rad, this.datos.id, index);
      });
    }
  }
}
