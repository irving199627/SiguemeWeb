import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

import * as firebase from 'Firebase';

@Injectable()
export class AutobusesService {

  constructor( private db: AngularFireDatabase ) {
  }

}

interface Autobus {
  lng: number;
  lat: number;
  id: string;
}
