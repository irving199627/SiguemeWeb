import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class TiemposService {
  contador = 0;
  fecha = new Date();
  // info;
  constructor( private activatedRoute: ActivatedRoute ) {
  }

  incrementarContador ( probar ) {
    console.log( probar );
    if ( probar ) {
    const horaEntrada = `${this.fecha.getHours()}:${this.fecha.getMinutes()}:${this.fecha.getSeconds()}`;
    console.log(horaEntrada);
  }
}

getHoraSalida( probar ) {
  console.log(probar);
  const horaSalida = `${this.fecha.getHours()}:${this.fecha.getMinutes()}:${this.fecha.getSeconds()}`;
    console.log(horaSalida);
}
}
