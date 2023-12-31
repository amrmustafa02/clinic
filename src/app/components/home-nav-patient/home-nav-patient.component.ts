import {Component, Inject} from '@angular/core';
import {GetDoctorsResponseBody, User} from "../../models/patient/get_doctors_body";
import {ApiData} from "../../api.data";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Doctor, SearchDoctorBody} from "../../models/patient/search_doctors_body";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {UserUtils} from "../utils/user.utils";
import {ToastrService} from "ngx-toastr";
import {Format} from "@angular-devkit/build-angular/src/builders/extract-i18n/schema";
import {GetDoctorSlotsByIdResponseBody, Slot} from "../../models/patient/get_docots_slots__idresponse_body";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-home-nav-patient',
  templateUrl: './home-nav-patient.component.html',
  styleUrls: ['./home-nav-patient.component.css']
})

export class HomeNavPatientComponent {
  doctors: User[] = []


  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.getDoctorsWithSlots();
  }

  async getDoctorsWithSlots() {
    this.http.get<GetDoctorsResponseBody>(ApiData.baseUrl + ApiData.getDoctors, {
      headers: {
        "authenticated": "key_" + UserUtils.token
      }
    }).subscribe(
      (data) => {
        console.log(data);
        this.doctors = data.user;

        console.log(data.user);
        // console.log(this.doctors.length);
      }, (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    );
  }

  searchByName(name: string) {
    console.log(name);
    this.doctors = [];
    this.http.get<SearchDoctorBody>(ApiData.baseUrl + ApiData.search, {
      params: {
        "name": name,
      },
      headers: {
        "authenticated": "key_" + UserUtils.token
      }
    }).subscribe(
      (data) => {
        console.log(data);
        this.doctors = data.doctor as User[];
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    );
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
      await this.getDoctorsWithSlots();
    });
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
    this.http.get<GetDoctorSlotsByIdResponseBody>(ApiData.baseUrl +ApiData.geeDoctorSlotById + doctorId, {
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
