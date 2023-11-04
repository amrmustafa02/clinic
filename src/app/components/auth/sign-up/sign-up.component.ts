import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpRequestBody } from 'src/app/models/auth/sign.up.request.body';
import { SignUpResponseBody } from 'src/app/models/auth/sign.up.response.body';
import { UserUtils } from '../../utils/user.utils';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiData } from 'src/app/api.data';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  // templateUrl: './sig_up_test.html',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  remeberMe = true;
  colorOfCheckBox = "#ffffff";



  role = '';
  name?= "";
  email?: string = '';
  password?: string = '';
  cPassword?: string = '';
  age?: number = -1;
  phone?: string = '';
  gender?: string = 'male';

  passwordMessage = "";



  constructor(private route: Router, private httpClient: HttpClient, private toast: ToastrService) {
    if (UserUtils.role.length == 0) {
      this.role = this.route!.getCurrentNavigation()!.extras!.state!['role'];
      UserUtils.role = this.role;
    } else {
      this.role = UserUtils.role;
    }
  }

  ngOnInit() { }


  clickOnRemeberMe() {


    const checkbox = document.getElementById(
      'remember-me',
    ) as HTMLInputElement | null;


    // this.name = name!.value!;

    if (checkbox != null) {
      // ✅ Set checkbox checked
      if (checkbox.checked == true) {
        this.colorOfCheckBox = "#00BFA6";
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

    this.extractFields();
    var isSuccess = this.handleFields()

    if (!isSuccess) {
      return;
    }


    var body = new SignUpRequestBody();
    body.name = this.name;
    body.age = this.age;
    body.email = this.email;
    body.password = this.password;
    body.confirmPassword = this.password;
    body.gender = this.gender;
    body.phone = this.phone;
    body.role = this.role;
    console.log(body);
    this.toast.info('Please wait', '', { timeOut: 1000 });

    try {
      var response = this.sendPostRequest(body);
      response.subscribe((data) => {

        console.log(data.token);

        // this.toast.success('Please wait', 'Succes login');
        this.route.navigate(["/patient/home"], { state: data, replaceUrl: true });

      }, (err: HttpErrorResponse) => {
        if (err.status == 409)
          this.toast.error('User elready exsit');
        else if(err.status==400){
          console.log(err.error);
          
          this.toast.error("some thing went wrong ");

        }
      }
      );
    } catch (err) {
    }

  }

  onGenderChange(value: string) {
    this.gender = value;
  }



  extractFields(): void {
    const nameInput = document.getElementById(
      'nameInput',
    ) as HTMLInputElement | null;

    const emailInput = document.getElementById(
      'emailInput',
    ) as HTMLInputElement | null;


    const passwordInput = document.getElementById(
      'passwordInput',
    ) as HTMLInputElement | null;

    // const confirmPassowrdInput = document.getElementById(
    //   'cPasswordInput',
    // ) as HTMLInputElement | null;

    const ageInput = document.getElementById(
      'ageInput',
    ) as HTMLInputElement | null;

    const phoneInput = document.getElementById(
      'phoneInput',
    ) as HTMLInputElement | null;


    this.name = nameInput!.value;
    this.email = emailInput!.value;
    this.password = passwordInput!.value;
    // this.cPassword = confirmPassowrdInput!.value!;
    this.age = +ageInput!.value;
    this.phone = phoneInput!.value;


  }


  handleFields() {
    var isSuccess = true;
    if (this.name!.length == 0) {
      // this.name = undefined;
      isSuccess = false;
    }

    if (this.email!.length == 0 && !this.isEmailFormat(this.email ?? "")) {
      // this.email = undefined
      isSuccess = false;
      this.toast.error('Please enter your name', 'Name empty');
    }

    if (this.password?.length == 0) {
      // this.password = undefined;
      this.passwordMessage = "Please enter your password";
      this.toast.error('Please enter your password', 'Password empty');

      isSuccess = false;

    }
    else if (!this.isPasswordValid(this.password ?? "")) {
      // this.password = undefined
      this.passwordMessage = "Please vaild password";
      this.toast.error('Please vaild password at least 1 uppercase ', 'Password invaild');

      isSuccess = false;

    }

    // if (!this.isPasswordMatching(this.password ?? "", this.cPassword ?? "")) {
    //   this.cPassword = undefined;
    //   isSuccess = false;

    // }

    if (Number.isNaN(this.age) || this.age == 0) {

      this.age = 0;
      // console.log(this.age);
      isSuccess = false;
      this.toast.error('Please enter vaild age', 'Age Empty');


    }

    if (this.phone?.length == 0) {
      // this.phone = undefined;
      isSuccess = false;
      this.toast.error('Please enter vaild phone', 'Phone');

    }

    return isSuccess;


  }



  isPasswordValid(password: string): boolean {
    var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordPattern.test(password);
  }


  isEmailFormat(email: string) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  isPasswordMatching(password: string, cPassword: string) {
    return password == cPassword;
  }




  sendPostRequest(body: SignUpRequestBody): Observable<SignUpResponseBody> {


    return this.httpClient.post<SignUpResponseBody>(ApiData.baseUrl + ApiData.signUpEndPoint,
      {
        "name": body.name,
        "age": body.age,
        "email": body.email,
        "password": body.password,
        "confirmPassword": body.confirmPassword,
        "gender": body.gender,
        "phone": body.phone,
        "role": this.role
      },
    );
  }



}
