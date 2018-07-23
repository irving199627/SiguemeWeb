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

  pathIsla = [
    {lat: 20.945623, lng: -89.657455},
    {lat: 20.945468, lng: -89.657362},
    {lat: 20.945536, lng: -89.657230},
    {lat: 20.945686, lng: -89.657321},
    {lat: 20.945623, lng: -89.657455}
  ];

  pathRecepcion = [
    {lat: 20.946260, lng: -89.657159},
    {lat: 20.946182, lng: -89.656890},
    {lat: 20.945994, lng: -89.656946},
    {lat: 20.946075, lng: -89.657226},
    {lat: 20.946260, lng: -89.657159}
  ];

  pathPre = [
    {lat: 20.945894, lng: -89.657389},
    {lat: 20.945633, lng: -89.657872},
    {lat: 20.945464, lng: -89.657796},
    {lat: 20.945724, lng: -89.657295},
    {lat: 20.945894, lng: -89.657389}
  ];

  pathDetallado = [
    {lat: 20.945646, lng: -89.658308},
    {lat: 20.945531, lng: -89.658349},
    {lat: 20.945484, lng: -89.658136},
    {lat: 20.945621, lng: -89.658114},
    {lat: 20.945646, lng: -89.658308}
  ];
  pathImg = [
    {lat: 20.945657, lng: -89.658490},
    {lat: 20.945576, lng: -89.658520},
    {lat: 20.945678, lng: -89.658788},
    {lat: 20.945742, lng: -89.658751},
    {lat: 20.945657, lng: -89.658490}
  ];

  pathListos = [
    {lat: 20.945616, lng: -89.659190},
    {lat: 20.945724, lng: -89.659103},
    {lat: 20.946055, lng: -89.659837},
    {lat: 20.945936, lng: -89.659915},
    {lat: 20.945616, lng: -89.659190}
  ];
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
