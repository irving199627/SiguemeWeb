import { Component, OnInit } from '@angular/core';
import { TiemposService } from '../../services/tiempos.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styles: []
})
export class InformacionComponent implements OnInit {
  id;
  index: number;
  contador = 0;
  items: Observable<any>;
  // info;
  latitud: number;
  longitud: number;
  variable = false;

  constructor( private activatedRoute: ActivatedRoute, public _ts: TiemposService, public db: AngularFireDatabase ) {
    this.activatedRoute.params.subscribe( id => {
      this.index = id['i'];
      console.log(id);
    });
    this.items = this.db.list(`dispositivo/ATS/${this.index}`).valueChanges();
    this.items.forEach(objetos => {
        this.latitud = objetos[1];
        this.longitud = objetos[2];
        this.id = objetos[0];
        console.log(this.id);
        console.log(this.latitud);
        console.log(this.longitud);
        });
  }
    ngOnInit() {
      setTimeout(() => {
        this.ejecutar();
      }, 2000);
    }
    ejecutar() {
      console.log('latitud despues del foreach', this.latitud);
      if ( this.latitud === 20.8742161 ) {
        this.variable = true;
        this._ts.incrementarContador(this.variable);
        } else {
          this.variable = false;
          this._ts.getHoraSalida( this.variable );
        }
    }
  }


