import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';

// servicios
import { AutobusesService } from './services/autobuses.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { TiemposService } from './services/tiempos.service';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AgmCoreModule } from '@agm/core';

import { AngularFireModule } from 'angularfire2';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

import { app_routing } from './app.routes';
import { PrincipalComponent } from './components/principal/principal.component';
import { InformacionComponent } from './components/informacion/informacion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
    InformacionComponent
  ],
  imports: [
BrowserModule,
  app_routing,
    HttpModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAG_oCjWM9LKCPBmUemDmYzAlSOtsyaoAQ'
    }),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
  ],
  providers: [AutobusesService, AuthService, AuthGuardService, TiemposService],
  bootstrap: [AppComponent]
})
export class AppModule { }
