import {Component} from '@angular/core';
import {UserUtils} from './components/utils/user.utils';
import {Router} from '@angular/router';
import {RoutesData} from './routes';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clinic-reservation';

  constructor(route: Router) {
    console.log(environment.baseUrl);
    if (UserUtils.checkIfRemeberMe()) {

      console.log("enter");
      UserUtils.getUserData();
      console.log(UserUtils.user);


      if (UserUtils.user.role == "doctor") {

        console.log("enter");

        route.navigate([RoutesData.doctorHome],);

      } else {
        console.log("enter2");

        route.navigate([RoutesData.userHome]);
      }

    } else {
      UserUtils.role = "";
      route.navigate([RoutesData.role], {replaceUrl: true});
    }
  }
}
