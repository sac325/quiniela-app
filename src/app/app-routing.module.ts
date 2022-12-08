import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { EquiposComponent } from './equipos/equipos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './usuarios/login.component';
import { FormComponent } from './equipos/form.component';

const appRoutes: Routes = [
  { path: 'equipos', component: EquiposComponent },
  { path: 'equipos/form', component: FormComponent },
  { path: 'equipos/form/:id', component: FormComponent },
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
