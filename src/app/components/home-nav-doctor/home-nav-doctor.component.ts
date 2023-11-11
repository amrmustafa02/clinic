import {Component} from '@angular/core';

import {UserUtils} from '../utils/user.utils';
import {UserModel} from 'src/app/models/home-doctor/user.model';
import {DatePipe, formatDate} from '@angular/common';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {ApiData} from "../../api.data";
import {ToastrService} from "ngx-toastr";
import {AddSlotResponseBody} from "../../models/home-doctor/add_slot_reponse_body";
import {GetDoctorsResponseBody} from "../../models/patient/get_doctors_body";
import {Slot, SlotsModel} from "../../models/home-doctor/slots.model";
import {Format} from "@angular-devkit/build-angular/src/builders/extract-i18n/schema";

@Component({
  selector: 'app-home-nav-doctor',
  templateUrl: './home-nav-doctor.component.html',
  styleUrls: ['./home-nav-doctor.component.css'],

})
export class HomeNavDoctorComponent {
  time? = new Date();

  user?: UserModel;

  todaySlot?: Slot[];


  constructor(private http: HttpClient, private toast: ToastrService) {
    this.user = UserUtils.user;
    // this.user.name;
    console.log("userr");
    this.getToadySlots().then(r => {
    });

  }

  clickOnSlot(date: string, time: string): void {

    if (date == "") {
      this.toast.error("please choose date");
      return;
    } else if (time == "") {
      this.toast.error("please choose time");
      return;
    }

    // format date
    const datePipe: DatePipe = new DatePipe('en-US');
    let formattedDate = datePipe.transform(Date.parse(date), 'MMMM dd, YYYY ');

    if (formattedDate != null) {
      formattedDate += time + ":00";
      console.log(formattedDate);
      this.toast.info("Please wait.....");
      this.addSlotRequest(formattedDate).subscribe(
        (data) => {
          console.log(data);
          this.toast.success("Add Successfully")
        }, (error: HttpErrorResponse) => {
          this.toast.error(error.error["mesgError"])

        }
      );
    }


  }

  addSlotRequest(date: string): Observable<AddSlotResponseBody> {
    const headerDict = {
      "authenticated": "key_" + UserUtils.token,
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post<AddSlotResponseBody>(ApiData.baseUrl + ApiData.addSlotEndPoint, {
      "date": date,
    }, requestOptions);
  }

  async getToadySlots(): Promise<void> {
    await this.getSlotsUser();


  }

  formatDate(date: string, format: string) {

    const datepipe: DatePipe = new DatePipe('en-US')

    const dat = Date.parse(date);

    // let formattedDate = datepipe.transform(dat, 'MMMM, dd EEE, YYYY')

    let formattedDate = datepipe.transform(dat, format);

    // console.log(formattedDate);

    return formattedDate;
  }

  async getSlotsUser() {

    this.http.get<SlotsModel>(ApiData.baseUrl + "/slot",
      {
        headers: {
          "authenticated": "key_" + UserUtils.token
        }
      }).subscribe(
      (data) => {
        // this.todaySlot = data.slots;
        console.log(data);

        const toadyDate = this.formatDate(Date(), "MMMM dd YYYY");
        for (let i = 0; i < data.slots!.length; i++) {
          const slotDate = this.formatDate(data.slots![i].date, "MMMM dd YYYY");
          if (slotDate == toadyDate) {
            this.todaySlot!.push(data.slots[i]);
          }
        }
      }
    );
  }

  protected readonly Date = Date;
}
