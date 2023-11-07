import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpRequestBody } from 'src/app/models/auth/sign.up.request.body';
import { SignUpResponseBody } from 'src/app/models/auth/sign.up.response.body';
import { UserUtils } from '../../utils/user.utils';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiData } from 'src/app/api.data';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/home-doctor/user.model';
import { RoutesData } from 'src/app/routes';

@Component({
  selector: 'app-sign-up',
  // templateUrl: './sig_up_test.html',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  remeberMe = false;
  colorOfCheckBox = "#ffffff";

  multilineString: string = `
Please enter password should
,Contain at least one digit
,Contain at least one lowercase letter.
,Contain at least one uppercase letter.
,Contain at least one alphanumeric character (letter or digit).
,Be at least 8 characters in length
`;

  role = '';
  name?= "";
  email?: string = '';
  password?: string = '';
  cPassword?: string = '';
  age?: number = -1;
  phone?: string = '';
  gender?: string = 'male';

  passwordMessage = "";
  specialization = '';


  constructor(private route: Router, private httpClient: HttpClient, private toast: ToastrService) {
    if (UserUtils.role.length == 0) {
      this.role = this.route!.getCurrentNavigation()!.extras!.state!['role'];
      UserUtils.role = this.role;
    } else {
      this.role = UserUtils.role;
    }
  }

  ngOnInit() { }



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
      var response: Observable<SignUpResponseBody>;
      if (this.role == "doctor") {
        response = this.addNewDoctor(body);

      } else {
        response = this.addNewUser(body);

      }

      response.subscribe((data) => {

        // console.log(data.token);

        UserUtils.user = data.result as UserModel;
        UserUtils.token = data.token!;

        console.log(UserUtils.user);


        if (this.remeberMe == true) {
          UserUtils.saveUserData(data.result as UserModel, data.token!);
        }

        if (UserUtils.role == "doctor") {
          this.route.navigate([RoutesData.doctorHome], { replaceUrl: true });
        } else {
          this.route.navigate([RoutesData.userHome], { replaceUrl: true });
        }



      }, (err: HttpErrorResponse) => {
        if (err.status == 409)
          this.toast.error('User elready exsit');
        else if (err.status == 400) {
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
  onSpecializationChange(value: string) {
    this.specialization = value;
    console.log(this.specialization);
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

    const ageInput = document.getElementById(
      'ageInput',
    ) as HTMLInputElement | null;

    const phoneInput = document.getElementById(
      'phoneInput',
    ) as HTMLInputElement | null;

    const checkbox = document.getElementById(
      'remember-me',
    ) as HTMLInputElement | null;



    this.name = nameInput!.value;
    this.email = emailInput!.value;
    this.password = passwordInput!.value;
    // this.cPassword = confirmPassowrdInput!.value!;
    this.age = +ageInput!.value;
    this.phone = phoneInput!.value;
    this.remeberMe = checkbox!.checked;


  }


  handleFields() {
    var isSuccess = true;
    if (this.name!.length == 0) {
      // this.name = undefined;
      isSuccess = false;
      this.toast.error('Please enter enter name.');
    }

    if (this.email!.length == 0 && !this.isEmailFormat(this.email ?? "")) {
      // this.email = undefined
      isSuccess = false;
      this.toast.error('Please enter vaild email.');
    }

    if (this.password?.length == 0) {
      // this.password = undefined;
      this.passwordMessage = "Please enter your password";
      this.toast.error(this.multilineString);

      isSuccess = false;

    }

    else if (!this.isPasswordValid(this.password ?? "")) {
      // this.password = undefined
      this.passwordMessage = "Please vaild password";
      this.toast.error('Please vaild password');
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
      this.toast.error('Please enter vaild age');
    }

    if (this.phone?.length == 0) {
      isSuccess = false;
      this.toast.error('Please enter vaild phone');
    }

    if (this.specialization == '' && this.role == "doctor") {
      isSuccess = false;
      this.toast.error('Please enter your specialization');
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




  addNewUser(body: SignUpRequestBody): Observable<SignUpResponseBody> {

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


  addNewDoctor(body: SignUpRequestBody): Observable<SignUpResponseBody> {

    return this.httpClient.post<SignUpResponseBody>(ApiData.baseUrl + ApiData.signUpEndPoint,
      {
        "name": body.name,
        "age": body.age,
        "specialization": this.specialization,
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
