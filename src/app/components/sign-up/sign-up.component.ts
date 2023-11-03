import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  remeberMe = true;
  colorOfCheckBox = "#ffffff";
  rangeAge = [1];
  role = '';
  // #59e4a8
  constructor(private route: Router) {
  this.role =  this.route!.getCurrentNavigation()!.extras!.state!['role'];
  }

  ngOnInit() {

  }
  clickOnRemeberMe() {
    // alert("hellow")
    // this.colorOfCheckBox = "#ffffff"; 

    const checkbox = document.getElementById(
      'remember-me',
    ) as HTMLInputElement | null;

    if (checkbox != null) {
      // ✅ Set checkbox checked
      if (checkbox.checked == true) {
        this.colorOfCheckBox = "#59e4a8";
      } else {
        this.colorOfCheckBox = "#ffffff";
      }

      // ✅ Set checkbox unchecked
      // checkbox.checked = false;
    }
  }
  clickOnLogin() {
    this.route.navigate(['/login'],);
  }
}
