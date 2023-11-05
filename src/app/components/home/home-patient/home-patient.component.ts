import { Component } from '@angular/core';
import { User } from 'src/app/models/auth/sign.up.response.body';
import { UserUtils } from '../../utils/user.utils';

@Component({
  selector: 'app-home-patient',
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.css']
})
export class HomePatientComponent {
  user?: User;
  token?:string;
  constructor() {
    this.user = UserUtils.user;
    this.token = UserUtils.token;
  }
}
