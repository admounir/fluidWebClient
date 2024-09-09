import { RouterModule, Routes } from '@angular/router';
import AppointmentViewComponent from './appointment-view/appointment-view.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    // { path: '', redirectTo: '/appointment', pathMatch: 'full' },
    // { path: 'appointment', component: AppointmentViewComponent }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }