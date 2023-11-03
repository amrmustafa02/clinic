import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpRequestBody } from 'src/app/models/auth/sign.up.request.body';
import { SignUpResponseBody } from 'src/app/models/auth/sign.up.response.body';
import { FormsModule } from '@angular/forms';
import { UserUtils } from '../../utils/user.utils';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  remeberMe = true;
  colorOfCheckBox = "#ffffff";

  role = '';
  @Input() name: string = '';
  email = '';
  password = '';
  confirmPassowrd = "";
  age = '';
  phone = '';


  constructor(private route: Router) {
    if (UserUtils.role.length == 0) {
      this.role = this.route!.getCurrentNavigation()!.extras!.state!['role'];
      UserUtils.role = this.role;
    } else {
      this.role = UserUtils.role;
    }
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
    this.route.navigate(['/login'], { replaceUrl: true });
  }

  clickOnRegister() {
    // name = nameInput.;
  }
}
