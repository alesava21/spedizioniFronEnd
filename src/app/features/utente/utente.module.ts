import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../shared/material/material.module";
import {ListUtenteComponent} from "./list-utente/list-utente.component";
import {DetailUserComponent} from "./detail-utente/detail-utente.component";

const routes: Routes = [
  {
    path: 'list',
    component: ListUtenteComponent
  },

  {
    path: ':id',
    component: DetailUserComponent
  },

  {
    path: 'create',
    component: DetailUserComponent
  },

  {
    path: 'edit/:id',
    component: DetailUserComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [ListUtenteComponent,
    DetailUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule
  ]
})
export class UtenteModule {
}
