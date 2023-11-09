import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserUtils } from '../../utils/user.utils';
import { ToastrService } from 'ngx-toastr';
import { ApiData } from 'src/app/api.data';
import { SignInResponseBody } from 'src/app/models/auth/sign.respoonse.body';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UserModel } from 'src/app/models/home-doctor/user.model';
import { RoutesData } from 'src/app/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  remeberMe = true;
  colorOfCheckBox = "#ffffff";
  email?: string;
  password?: string;
  role: string = "";

  constructor(private route: Router, private toast: ToastrService, private httpClient: HttpClient) {

  }

  ngOnInit() {

  }

  clickOnDonHaveAccount() {
    this.route.navigate(['/sign-up'], { replaceUrl: true });
  }

  clickOnLogin() {
    this.extractFields();
    if (this.handleFields()) {

      this.sendLoginRequest(this.email!, this.password!).subscribe(
        (data: SignInResponseBody) => {
          // console.log(data);

          UserUtils.user = data.user as UserModel;
          UserUtils.token = data.token!;

          console.log(UserUtils.user);

          if (this.remeberMe) {
            UserUtils.saveUserData(data.user as UserModel, data.token);
          }

          if (UserUtils.role == "doctor") {
            this.route.navigate([RoutesData.doctorHome], { replaceUrl: true });
          } else {
            this.route.navigate([RoutesData.userHome], { replaceUrl: true });
          }
        }
      );
    }
  }

  extractFields() {
    const email = document.getElementById(
      'emailInput',
    ) as HTMLInputElement | null;
    const password = document.getElementById(
      'passwordInput',
    ) as HTMLInputElement | null

    const checkbox = document.getElementById(
      'remember-me',
    ) as HTMLInputElement | null;


    this.remeberMe = checkbox!.checked;
    this.email = email!.value;
    this.password = password!.value;

  }

  handleFields() {

    var isSuccess: boolean = true;

    if (this.email!.length == 0 && !UserUtils.isEmailFormat(this.email ?? "")) {
      // this.email = undefined
      isSuccess = false;
      this.toast.error('Please enter your vaild email');
    }

    if (this.password?.length == 0) {
      // this.password = undefined;
      this.toast.error('Please enter your password');
      isSuccess = false;
    }

    return isSuccess;
  }

  sendLoginRequest(email: string, password: string): Observable<SignInResponseBody> {
    return this.httpClient.post<SignInResponseBody>(ApiData.baseUrl + ApiData.loginEndPoint, {
      "email": email,
      "password": password
    });
  }
}
