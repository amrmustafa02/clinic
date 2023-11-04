import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ChooseRoleComponent } from './components/auth/choose-role/choose-role.component';
import { HomePatientComponent } from './components/home/home-patient/home-patient.component';

const routes: Routes = [
  { path: "sign-up", component: SignUpComponent },
  { path: "login", component: LoginComponent },
  { path: "patient/home", component: HomePatientComponent },
  { path: "role", component: ChooseRoleComponent },
  { path: '', redirectTo: "/role", pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
