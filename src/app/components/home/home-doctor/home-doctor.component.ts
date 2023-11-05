import { Component } from '@angular/core';
import { UserUtils } from '../../utils/user.utils';

@Component({
  selector: 'app-home-doctor',
  templateUrl: './home-doctor.component.html',
  styleUrls: ['./home-doctor.component.css']
})
export class HomeDoctorComponent {
 name?:string;

 constructor() {
  this.name = UserUtils.user.name;
 }
}
