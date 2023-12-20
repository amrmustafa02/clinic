import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserUtils} from "../../utils/user.utils";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-choose-role',
  templateUrl: './choose-role.component.html',
  styleUrls: ['./choose-role.component.css']
})
export class ChooseRoleComponent {
  pColor = "#00BFA6";

  constructor(private route: Router) {
    console.log(environment.baseUrl);
  }

  clickOnDoctor(): void {
    UserUtils.role = "doctor";
    this.route.navigate(["/sign-up"], { state: { role: 'doctor' }, replaceUrl: true });
  }
  clicOnPatient(): void {
    UserUtils.role = "patient";
    this.route.navigate(["/sign-up"], { state: { role: 'patient' }, replaceUrl: true });
  }

}
