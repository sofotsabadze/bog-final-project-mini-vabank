import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthComponent} from "./auth/auth.component";
import {Bpm00Component} from "./shell/modules/bpm/bpm00/bpm00.component";
import {Bpm01Component} from "./shell/modules/bpm/bpm01/bpm01.component";
import {BpmComponent} from "./shell/modules/bpm/bpm.component";

export const routes: Routes = [ {
  path: 'auth',
  component: AuthComponent,
  children: [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ]
},
  {
    path: 'bpm',
    // component: BpmComponent,
    children: [
      { path: 'bpm00', component: Bpm00Component },
      // { path: 'bpm01', component: Bpm01Component }
    ]
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }, // Default to login
  { path: '**', redirectTo: '/auth' } // Wildcard route for handling 404s
];

