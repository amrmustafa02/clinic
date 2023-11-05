import { Component } from '@angular/core';
import { UserUtils } from './components/utils/user.utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clinic-reservation';

  constructor(route: Router) {
    if (UserUtils.checkIfRemeberMe()) {

      console.log("enter");
      UserUtils.getUserData();
      console.log(UserUtils.user);


      if (UserUtils.user.role == "doctor") {
        route.navigate(["/doctor/home"], { replaceUrl: true });
      } else {
        route.navigate(["/patient/home"], { replaceUrl: true });
      }
    } else {
      UserUtils.role = "";
      route.navigate(["/role"], { replaceUrl: true });
    }
  }
}
