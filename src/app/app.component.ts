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

  constructor(route:Router) {
    if (UserUtils.checkIfRemeberMe()) {
      console.log("enter");
       UserUtils.getUserData();
       route.navigate(["patient/home"]);
    }else{
      route.navigate(["/role"]);
    }
  }
}
