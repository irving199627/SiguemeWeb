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

  lat;
  lng;
  id;
  info;
  index: number;
  items: Observable<any>;
  datos: any[] = [];
  timpoTaller;
  filtrarPor;
  minutosDentro;
  minutosFuera;


  variable = false;

  constructor( private activatedRoute: ActivatedRoute,
               public _ts: TiemposService,
               public db: AngularFireDatabase ) {
    this.activatedRoute.params.subscribe( id => {
      this.index = id['i'];
    });
    this.items = this.db.list(`dispositivo/ATS/${ this.index }`).valueChanges();
    this.items.forEach( datos => {
      this.lat = datos[1];
      this.lng = datos[2];
      this.id = datos[0];
    });
  }
    ngOnInit() {
    }
  }


