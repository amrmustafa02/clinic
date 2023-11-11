import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from '@angular/core';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
  ScrollingModule
} from '@angular/cdk/scrolling';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {GetDoctorSlotsByIdResponseBody, Slot} from "../../models/patient/get_docots_slots__idresponse_body";
import {ApiData} from "../../api.data";
import {UserUtils} from "../utils/user.utils";
import {GetDoctorsMajorBodyModel, User} from "../../models/patient/get.doctors.major.body.model";

@Component({
  selector: 'app-majors-nav-patient',
  templateUrl: './majors-nav-patient.component.html',
  styleUrls: ['./majors-nav-patient.component.css']
})
export class MajorsNavPatientComponent {

  major = "General-Practitioner-(GP)";
  doctors: User[] = [];

  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.getDoctors(this.major);
  }

  async openDialog(index: number) {

    console.log(index);
    // this.doctors=[];
    // await this.getDoctorsWithSlots();

    const data = JSON.stringify(this.doctors[index]);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: this.doctors[index]
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log(`Dialog result: ${result}`);
      this.doctors = [];
      // await this.getDoctorsWithSlots();
      this.getDoctors(this.major);
    });
  }

  getDoctors(major: string) {
    this.http.get<GetDoctorsMajorBodyModel>(ApiData.baseUrl + "/user/GetDoctorWithMajors", {
      headers: {
        "authenticated": "key_" + UserUtils.token,
      },
      params: {
        "major": major
      }
    }).subscribe(
      (data) => {
        console.log(data);
        this.doctors = data.user;
      }
    );
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'doctor.slots.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    NgOptimizedImage,
    NgForOf,
    CdkFixedSizeVirtualScroll,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    NgIf
  ]
})
export class DialogOverviewExampleDialog {
  doctor?: User;
  src: string = "/assets/images/doctor-avatar-2.png";

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private http: HttpClient,
    private toast: ToastrService,
  ) {
    this.doctor = data;
    if (this.doctor.gender == "male") {
      this.src = "/assets/images/doctor-avatar.png"
    }
    this.getDoctorsByIdById(this.doctor.id);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getDoctorsByIdById(doctorId: number) {
    this.http.get<GetDoctorSlotsByIdResponseBody>(ApiData.baseUrl + ApiData.geeDoctorSlotById + doctorId, {
      headers: {
        "authenticated": "key_" + UserUtils.token
      }
    }).subscribe(
      (data) => {
        console.log(data)
        this.doctor!.slots = data.slots as Slot[];
      }
    );
  }

  formatHours(date: string) {

    const dat = new Date(date);

    dat.setHours(dat.getHours() - 2);

    const datepipe: DatePipe = new DatePipe('en-US')

    let formattedDate = datepipe.transform(dat, ' hh:mm a')


    return formattedDate;
  }

  formatDate(date: string, format: string) {

    const datepipe: DatePipe = new DatePipe('en-US')

    const dat = Date.parse(date);

    // let formattedDate = datepipe.transform(dat, 'MMMM, dd EEE, YYYY')

    let formattedDate = datepipe.transform(dat, format);

    // console.log(formattedDate);

    return formattedDate;
  }

  clickOnRegister(slotId: number) {
    this.toast.info("Please wait");
    this.http.post(ApiData.baseUrl + ApiData.appointment + slotId, {}, {
      headers: {
        "authenticated": "key_" + UserUtils.token
      }
    }).subscribe(
      (data) => {
        console.log(data);
        this.toast.success("Register Successfully");
        this.onNoClick();
      },
      (error: HttpErrorResponse) => {
        this.toast.error(error.error["mesgError"]);
        this.onNoClick();

      }
    );
  }

}

