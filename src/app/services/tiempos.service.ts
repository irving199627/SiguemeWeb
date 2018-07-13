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

    // console.log( 'la distancia entre p1 y p2', this.d);
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
      const tiempo = this.db.object(`dispositivo/ATS/${ index }/${ this.obtenerFecha()}`);
      if (this.dentroTaller === true) {
        tiempo.update({ horasDentroTaller: this.obtenerHoras(),
                        minutosDentroTaller: this.obtenerMinutos(),
                        segundosDentroTaller: this.obtenerSeg(),
                        horaEntradaTaller: this.obtenerTiempo() });

      } else {
        tiempo.update({ horasSalidaTaller: this.obtenerHoras(),
          minutosSalidaTaller: this.obtenerMinutos(),
          segundosSalidaTaller: this.obtenerSeg(),
          horaSalidaTaller: this.obtenerTiempo() });
      }
      break;
    }
  }

  obtenerTiempo(){
    const time = new Date();
    return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
  }

  obtenerHoras() {
    const time = new Date();
    return time.getHours();
  }
  obtenerMinutos() {
    const time = new Date();
    return time.getMinutes();
  }
  obtenerSeg() {
    const time = new Date();
    return time.getSeconds() + '';
  }

  obtenerFecha() {
    const fecha = new Date();
    let mes;
    if ( fecha.getMonth() + 1 < 10 ) {
      mes = '0' + (fecha.getMonth() + 1);
    } else {
      mes = (fecha.getMonth() + 1);
    }
    return fecha.getFullYear() + '-' + mes + '-' + fecha.getDate();
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
