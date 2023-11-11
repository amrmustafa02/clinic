import {Component} from '@angular/core';
import {User} from 'src/app/models/auth/sign.up.response.body';
import {UserUtils} from '../../utils/user.utils';
import {UserModel} from "../../../models/home-doctor/user.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiData} from "../../../api.data";

@Component({
  selector: 'app-home-patient',
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.css']
})
export class HomePatientComponent {

  patient?: UserModel;

  src = "/assets/images/woman.png";

  constructor(private http: HttpClient) {

    console.log(UserUtils.user);
    this.patient = UserUtils.user;

    if (this.patient.gender == "male") {
      this.src = "/assets/images/boy.png";
    }
    // this.getDoctorsWithSlots();
  }

  logOut(){
    localStorage.setItem('remeber', "false");
  }




}
