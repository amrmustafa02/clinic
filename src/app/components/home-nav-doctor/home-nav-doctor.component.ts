import { Component } from '@angular/core';

import { UserUtils } from '../utils/user.utils';
import { UserModel } from 'src/app/models/home-doctor/user.model';
import { DatePipe } from '@angular/common';
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiData } from "../../api.data";
import { ToastrService } from "ngx-toastr";
import { AddSlotResponseBody } from "../../models/home-doctor/add_slot_reponse_body";
import { Slot, SlotsModel } from 'src/app/models/home-doctor/slots.model';

@Component({
  selector: 'app-home-nav-doctor',
  templateUrl: './home-nav-doctor.component.html',
  styleUrls: ['./home-nav-doctor.component.css'],

})
export class HomeNavDoctorComponent {
  time?= new Date();
  user?: UserModel;
  slotData?: SlotsModel;
  slots?:Slot[];

  constructor(private http: HttpClient, private toast: ToastrService) {
    this.user = UserUtils.user;
    // this.user.name;
    console.log("userr");
    console.log(UserUtils.token);
    this.getSlotsRequest();
    this.getTodaySlots();

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
    let formattedDate = datePipe.transform(Date.parse(date), 'MMMM, dd, YYYY ');

    if (formattedDate != null) {
        formattedDate += time+":00"
      this.toast.info("Please wait.....");
      
      this.addSlotRequest(formattedDate).subscribe(
        (data) => {
          console.log(data);
          this.toast.success("Add Successfully")
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
    console.log(date);
    

    return this.http.post<AddSlotResponseBody>(ApiData.baseUrl + ApiData.addSlotEndPoint, {
      "date": date,
    }, requestOptions);
  }


  getSlotsRequest() {
    console.log("enter2");

    const headerDict = {
      "authenticated": "key_" + UserUtils.token,
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    console.log("enter3");

    this.http.get<SlotsModel>(ApiData.baseUrl + ApiData.addSlotEndPoint, requestOptions).subscribe(
      (data) => {
        console.log("enter4");

        console.log(data);
        this.slotData = data;
        this.slots = data.slots;
      }, (err) => {
        console.log(err);
      }
    );
  }


  getTodaySlots(){

  }



}
