import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ChooseRoleComponent } from './components/auth/choose-role/choose-role.component';
import { HomePatientComponent } from './components/home/home-patient/home-patient.component';
import { AppComponent } from './app.component';
import { HomeDoctorComponent } from './components/home/home-doctor/home-doctor.component';
import { RoutesData } from './routes';
import { HomeNavDoctorComponent } from './components/home-nav-doctor/home-nav-doctor.component';
import { PatientsNavDoctorComponent } from './components/patients-nav-doctor/patients-nav-doctor.component';
import {AppoinmentNavDoctorComponent} from "./components/appoinment-nav-doctor/appoinment-nav-doctor.component";

const routes: Routes = [
  { path: RoutesData.register, component: SignUpComponent },
  { path: RoutesData.login, component: LoginComponent },
  { path: RoutesData.userHome, component: HomePatientComponent },
  {
    path: RoutesData.doctorHome, component: HomeDoctorComponent,
    children: [

      { path: RoutesData.doctorNavHome, component: HomeNavDoctorComponent, },
      { path: RoutesData.doctorNavPatients, component: PatientsNavDoctorComponent, },
      { path: RoutesData.appointmentNavPatients, component: AppoinmentNavDoctorComponent, },
      { path: '', redirectTo: "home", pathMatch: "full" },
    ],

  },
  // { path: RoutesData.doctorNavHome, component: HomeNavDoctorComponent, },
  // { path: RoutesData.doctorNavPatients, component: PatientsNavDoctorComponent },
  { path: RoutesData.role, component: ChooseRoleComponent },
  { path: "app-root", component: AppComponent },
  { path: '', redirectTo: "app-root", pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
