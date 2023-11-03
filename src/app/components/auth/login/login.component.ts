import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  remeberMe = true;
  colorOfCheckBox = "#ffffff";

  // #59e4a8
  constructor(private route: Router) { }

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
  clickOnDonHaveAccount() {
    this.route.navigate(['/sign-up'], { replaceUrl: true });
  }
}
