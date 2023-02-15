import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSpedizioniComponent } from './list-spedizioni/list-spedizioni.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DialogComponent } from './dialog/dialog.component';
import { DetailSpedizioniComponent } from './detail-spedizioni/detail-spedizioni.component';
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  {
    path: 'list',
    component: ListSpedizioniComponent
  },

  {
    path: ':id',
    component: DetailSpedizioniComponent
  },

  {
    path: 'create',
    component: DetailSpedizioniComponent
  },

  {
    path: 'edit/:id',
    component: DetailSpedizioniComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    ListSpedizioniComponent,
    DialogComponent,
    DetailSpedizioniComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class SpedizioniModule { }
