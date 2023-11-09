import { Component } from '@angular/core';
import { SlotsModel } from 'src/app/models/home-doctor/slots.model';
import { UserUtils } from '../utils/user.utils';

@Component({
  selector: 'app-appoinment-nav-doctor',
  templateUrl: './appoinment-nav-doctor.component.html',
  styleUrls: ['./appoinment-nav-doctor.component.css']
})
export class AppoinmentNavDoctorComponent {
   slots?:SlotsModel;
  constructor() {
  //  this.slots= UserUtils;  

  }
}
