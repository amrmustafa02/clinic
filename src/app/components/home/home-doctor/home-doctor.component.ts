import {Component} from '@angular/core';
import {UserUtils} from '../../utils/user.utils';
import {UserModel} from 'src/app/models/home-doctor/user.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-doctor',
  templateUrl: './home-doctor.component.html',
  styleUrls: ['./home-doctor.component.css']
})
export class HomeDoctorComponent {

  doctor?: UserModel;

  src = "/assets/images/doctor-avatar-2.png";

  constructor(private route:Router) {

    console.log("userr");
    console.log(UserUtils.user);
    this.doctor = UserUtils.user;


    if (this.doctor.gender == "male") {
      this.src = "/assets/images/doctor-avatar.png";
    }

    console.log(UserUtils.token)

  }

  logOut(){
    localStorage.setItem('remeber', "false");
    this.route.navigate(["/role"]);
  }


}
