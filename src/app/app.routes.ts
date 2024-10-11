import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthComponent} from "./auth/auth.component";
import {Bpm00Component} from "./shell/modules/bpm/bpm00/bpm00.component";
import {Bpm01Component} from "./shell/modules/bpm/bpm01/bpm01.component";
import {ShellComponent} from "./shell/shell.component";
import {OperationsComponent} from "./shell/modules/krn/operations/operations.component";
import {CreateAccountComponent} from "./shell/modules/krn/accounts/create-account/create-account.component";
import {AccountsComponent} from "./shell/modules/krn/accounts/accounts.component";
import {KrnComponent} from "./shell/modules/krn/krn.component";
import {AuthGuard} from "./auth/AuthGuard";
import {Pmd311Component} from "./shell/modules/pmd/pmd311/pmd311.component";

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
    canActivate: [AuthGuard],
    component: ShellComponent,
    children: [
      { path: 'bpm00', component: Bpm00Component },
      { path: 'bpm01', component: Bpm01Component }
    ]
  },
  {
    path: 'pmd',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // component: KrnHeaderComponent,
        children: [
          {
            path: 'pmd311',
            component: Pmd311Component
          }
        ]
      }
    ]
  },
  {
    path: 'krn',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'krnicp', component: KrnComponent },
      {
        path: 'accounts',
        component: KrnComponent,
        children: [
          {
            path: '',
            component: AccountsComponent
          },
          {
            path: 'create',
            component: CreateAccountComponent
          }
        ]
      },
      {
        path: 'operations',
        component: KrnComponent,
        children: [
          {
            path: '',
            component: OperationsComponent
          }
        ]
      }
    ]
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth' }
];

