import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/auth/auth.guard';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('./features/welcome/welcome.module').then(m => m.WelcomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'spedizioni',
    loadChildren: () => import('./features/spedizioni/spedizioni.module').then(m => m.SpedizioniModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'utenti',
    loadChildren: () => import('./features/utente/utente.module').then(m => m.UtenteModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./core/auth/login/login.module').then(m => m.LoginModule)
  },

  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: '**', redirectTo: '/welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
