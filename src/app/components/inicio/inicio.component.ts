import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TiemposService } from '../../services/tiempos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {
  latitudTaller = 20.945457;
  longitudTaller = -89.658255;
  radioTaller = 220;
  datos = {};
  datosMark = {};


  lat: number;
  lng: number;
  // declaramos la variable de arreglo llamado autobuses, de tipo Autbus
  // esa variable debe contener id, lat, lng
  autobuses: Autobus[];
  siguiendoA: string = null;
  init = false;
  itemsRef: Observable<any>;
  variable = false;

  constructor(
              // creamos una instancia de la clase AngularFireDatabase
              public db: AngularFireDatabase,
              public _ts: TiemposService ) {
                // al ejecutar el metodo en el contructor este se ejecuta cuando la pagina se carga
              this.datosAutbus();
            }

  ngOnInit() {
  }

// en este metodo revisamos los cambios que ocurren en tiempo real, en la base de datos
  datosAutbus() {
    // igualamos los cambios de la base de datos "dispositivos/ATS"
    this.itemsRef =  this.db.object('dispositivo/ATS').valueChanges();
              // Realizamos un "por cada" en los cambios almacenados con anterioridad
              // creando una variable temporal llamada "data"
              this.itemsRef.forEach(data => {
                // almacenamos los datos de cada autobus almacenado en la base de datos
                this.autobuses = data;

                // si la variable init es falsa, obtenemos los datos del primer autobus
                // con el indice cero y cambiamos el valor de init a true
                if ( !this.init ) {
                  this.lat = data[0].lat;
                  this.lng = data[0].lng;
                  this.init = true;
                }
                // Si el valor de la variable siguiendoA es diferente de null
                // realizamos otro "por cada" pero esta ves de los datos de cada autobus
                if ( this.siguiendoA ) {
                  data.forEach(autobus => {
                    // si el id del autobus coincide con el vaor de siguiendoA entonces
                    // el valor de la latitud y longitud va a ser la misma a la del autobus...
                    // En esta parte se hace el seguimiento en tiempo real
                    if ( autobus.id === this.siguiendoA ) {
                      this.lng = autobus.lng;
                      this.lat = autobus.lat;
                    }
                  });
                }
              });
  }
  // Se crea el metodo seguir que se ejecuta al momento de hacer click en el boton
  // pasamos el parametro del autobus que es de tipo autobus e igualamos las variables
  // con los datos que vienen del parametro
  seguir( autobus: Autobus ) {
    this.siguiendoA = autobus.id;
    this.lat = autobus.lat;
    this.lng = autobus.lng;
  }
  // este metodo se ejecuta al darle click en el boton de dejar de seguir
  // lo unico que hace es cambiar el valor de siguiendoA a null
  dejarDeSeguir() {
    this.siguiendoA = null;
  }


}
// creamos la interface de autobus, este debe contener las variables que están en la base de datos
// de no cumplir con ese mismo numero de variables, marca error
interface Autobus {
  lng: number;
  lat: number;
  id: string;
}
