import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-role',
  templateUrl: './choose-role.component.html',
  styleUrls: ['./choose-role.component.css']
})
export class ChooseRoleComponent {
  pColor = "#00BFA6";

  constructor(private route: Router) {

  }

  clickOnDoctor(): void {
    this.route.navigate(["/sign-up"], { state: { role: 'doctor' }, replaceUrl: true });

  }
  clicOnPatient(): void {
    this.route.navigate(["/sign-up"], { state: { role: 'patient' }, replaceUrl: true });
  }

}
