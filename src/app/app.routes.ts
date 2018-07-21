import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AuthGuardService } from './services/auth-guard.service';
import { PrincipalComponent } from './components/principal/principal.component';
import { InformacionComponent } from './components/informacion/informacion.component';


const app_routes: Routes = [
  { path: 'principal', component: PrincipalComponent },
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [ AuthGuardService ]
  },
  { path: 'info/:i', component: InformacionComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'principal' }
];

export const app_routing = RouterModule.forRoot(app_routes);
