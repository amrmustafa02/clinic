import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiData} from "../../api.data";
import {UserUtils} from "../utils/user.utils";
import {Appointment, GetAppointmentResponseBody} from "../../models/patient/get.appointments.reponsr.body";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-appoinments-nav-patient',
  templateUrl: './appoinments-nav-patient.component.html',
  styleUrls: ['./appoinments-nav-patient.component.css']
})
export class AppoinmentsNavPatientComponent {

  appointments?: Appointment[] = [];


  constructor(private http: HttpClient) {
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

}
