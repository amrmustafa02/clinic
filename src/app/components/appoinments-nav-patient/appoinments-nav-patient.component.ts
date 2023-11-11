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
import {GetDoctorsResponseBody} from "../../models/patient/get_doctors_body";
import {FormLabelDirective} from "@coreui/angular";

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

  search(name: string) {
    this.http.get<GetAppointmentResponseBody>(ApiData.baseUrl + ApiData.myAppointment, {
      headers: {
        "authenticated": "key_" + UserUtils.token
      }
    }).subscribe(
      (data) => {
        console.log(data);
        this.appointments = data.appointments;
        this.appointments[0].slot.date
        for (let i = 0; i < this.appointments!.length; i++) {
          if (this.appointments![i].slot.user.name.includes(name)) {
            console.log(i);
            console.log(this.appointments.length);
            this.appointments!.slice(i, 1);
            // i--;
          }
        }

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

  openEditDialog(doctorId: number, appointmentId: number) {
    console.log(doctorId);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        "doctorId": doctorId,
        "appointmentId": appointmentId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.appointments = [];
      this.myAppointment();
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
  imports: [MatDialogModule, MatTabsModule, NgForOf, NgIf, FormLabelDirective,],
})
export class DialogOverviewExampleDialog {

  sameSlots: Slot[] = [];
  appointmentId?: number;
  curDoctorId?: number;
  doctorsWithSlots?: GetDoctorsResponseBody;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private toast: ToastrService
  ) {

    this.curDoctorId = data["doctorId"];
    this.appointmentId = data["appointmentId"];

    console.log(data);

    this.getSlotsDoctorById(this.curDoctorId!);
    this.getAnotherDoctorsWithSlots();
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


  getAnotherDoctorsWithSlots() {
    this.http.get<GetDoctorsResponseBody>(ApiData.baseUrl + ApiData.getDoctors, {
      headers: {
        "authenticated": "key_" + UserUtils.token
      }
    }).subscribe(
      (data) => {
        console.log(data);
        this.doctorsWithSlots = data;
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

  updateSlot(slotID: number) {
    this.toast.info("Please wait....");

    this.http.put(ApiData.baseUrl + ApiData.updateAppointment + this.appointmentId, {
      "slot": slotID,
    }, {
      headers: {
        "authenticated": "key_" + UserUtils.token
      }
    }).subscribe(
      (data) => {
        console.log(data);
        this.toast.success("update successfully");
        this.dialogRef.close();
      }, (err: HttpErrorResponse) => {
        this.toast.error(err.error["mesgError"]);
      }
    );
  }


}

