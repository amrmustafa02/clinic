import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ChooseRoleComponent } from './components/auth/choose-role/choose-role.component';
import { HomePatientComponent } from './components/home/home-patient/home-patient.component';
import { AppComponent } from './app.component';
import { HomeDoctorComponent } from './components/home/home-doctor/home-doctor.component';

const routes: Routes = [
  { path: "sign-up", component: SignUpComponent },
  { path: "login", component: LoginComponent },
  { path: "patient/home", component: HomePatientComponent },
  { path: "doctor/home", component: HomeDoctorComponent },
  { path: "role", component: ChooseRoleComponent },
  { path: "app-root", component: AppComponent },

  { path: '', redirectTo: "/app-root", pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
