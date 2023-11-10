import {Component, Inject} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiData} from "../../api.data";
import {UserUtils} from "../utils/user.utils";
import {Appointment, GetAppointmentResponseBody} from "../../models/patient/get.appointments.reponsr.body";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatTabsModule} from "@angular/material/tabs";
import {Slot} from "../../models/home-doctor/slots.model";
import {GetDoctorSlotsByIdResponseBody} from "../../models/patient/get_docots_slots__idresponse_body";

@Component({
  selector: 'app-appoinments-nav-patient',
  templateUrl: './appoinments-nav-patient.component.html',
  styleUrls: ['./appoinments-nav-patient.component.css']
})
export class AppoinmentsNavPatientComponent {

  appointments?: Appointment[] = [];


  constructor(private http: HttpClient, private toast: ToastrService, public dialog: MatDialog) {
    this.myAppointment();
  }

  myAppointment() {
    console.log(UserUtils.token);
    console.log(UserUtils.token);

    this.http.get<GetAppointmentResponseBody>(ApiData.baseUrl + ApiData.myAppointment, {
      headers: {
        "authenticated": "key_" + UserUtils.token
      }
    }).subscribe(
      (data) => {
        console.log(data);
        this.appointments = data.appointments;
        // this.appointments[0].slot.date
      }
    );
  }

  formatDate(date: string, format: string) {

    const datepipe: DatePipe = new DatePipe('en-US')

    const dat = Date.parse(date);

    // let formattedDate = datepipe.transform(dat, 'MMMM, dd EEE, YYYY')

    let formattedDate = datepipe.transform(dat, format);

    // console.log(formattedDate);

    return formattedDate;
  }

  formatHours(date: string) {

    const dat = new Date(date);

    dat.setHours(dat.getHours() - 2);

    const datepipe: DatePipe = new DatePipe('en-US')

    let formattedDate = datepipe.transform(dat, ' hh:mm a')


    return formattedDate;
  }

  openEditDialog(doctorId: number) {
    console.log(doctorId);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: doctorId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  cancelApooinment(slotId: number) {
    this.toast.info("Please wait");
    this.http.put(ApiData.baseUrl + ApiData.appointment + slotId, {}, {
      headers: {
        "authenticated": "key_" + UserUtils.token
      }
    }).subscribe(
      (data) => {
        console.log(data);
        this.appointments = [];
        this.myAppointment();
        this.toast.success("Cancel Successfully");
      },
      (error: HttpErrorResponse) => {
        this.toast.error(error.error["mesgError"]);

      }
    );
  }


}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'update_apoinment_bottom_sheet.html',
  standalone: true,
  imports: [MatDialogModule, MatTabsModule, NgForOf, NgIf,],
})
export class DialogOverviewExampleDialog {

  sameSlots: Slot[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private http: HttpClient
  ) {
    this.getSlotsDoctorById(data);
  }


  getSlotsDoctorById(doctorId: number) {
    this.http.get<GetDoctorSlotsByIdResponseBody>(ApiData.baseUrl + ApiData.geeDoctorSlotById + doctorId, {
      headers: {
        "authenticated": "key_" + UserUtils.token
      }
    }).subscribe(
      (data) => {
        console.log(data);
        this.sameSlots = data.slots;
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formatDate(date: string, format: string) {

    const datepipe: DatePipe = new DatePipe('en-US')

    const dat = Date.parse(date);

    // let formattedDate = datepipe.transform(dat, 'MMMM, dd EEE, YYYY')

    let formattedDate = datepipe.transform(dat, format);

    // console.log(formattedDate);

    return formattedDate;
  }

  formatHours(date: string) {

    const dat = new Date(date);

    dat.setHours(dat.getHours() - 2);

    const datepipe: DatePipe = new DatePipe('en-US')

    let formattedDate = datepipe.transform(dat, ' hh:mm a')


    return formattedDate;
  }

}

