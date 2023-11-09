import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {
  NgxMatDateAdapter,
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import {MatButtonModule} from '@angular/material/button';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignUpComponent} from './components/auth/sign-up/sign-up.component';
import {LoginComponent} from './components/auth/login/login.component';
import {ChooseRoleComponent} from './components/auth/choose-role/choose-role.component';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeDoctorComponent} from './components/home/home-doctor/home-doctor.component';
import {HomePatientComponent} from './components/home/home-patient/home-patient.component';
import {HomeNavDoctorComponent} from './components/home-nav-doctor/home-nav-doctor.component';
import {PatientsNavDoctorComponent} from './components/patients-nav-doctor/patients-nav-doctor.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core'
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';
import {AppoinmentNavDoctorComponent} from './components/appoinment-nav-doctor/appoinment-nav-doctor.component';
import {NgOptimizedImage} from "@angular/common";
import {HomeNavPatientComponent} from './components/home-nav-patient/home-nav-patient.component';
import {MajorsNavPatientComponent} from './components/majors-nav-patient/majors-nav-patient.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatTableModule} from '@angular/material/table';
import {MdbCheckboxModule} from 'mdb-angular-ui-kit/checkbox';
import { MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    ChooseRoleComponent,
    HomeDoctorComponent,
    HomePatientComponent,
    HomeNavDoctorComponent,
    PatientsNavDoctorComponent,
    AppoinmentNavDoctorComponent,
    HomeNavPatientComponent,
    MajorsNavPatientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    NgxMatTimepickerModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    ScrollingModule,
    MatTableModule,
    MdbCheckboxModule,

    ToastrModule.forRoot(
      {
        timeOut: 2000,
        progressBar: true
      }
    ),
    BrowserAnimationsModule,
    NgOptimizedImage,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
