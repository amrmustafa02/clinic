import {Component} from '@angular/core';
import {Slot, SlotsModel} from 'src/app/models/home-doctor/slots.model';
import {UserUtils} from '../utils/user.utils';
import {HttpClient} from "@angular/common/http";
import {ApiData} from "../../api.data";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-appoinment-nav-doctor',
  templateUrl: './appoinment-nav-doctor.component.html',
  styleUrls: ['./appoinment-nav-doctor.component.css']
})
export class AppoinmentNavDoctorComponent {
  allSlots: Slot[] = [];

  constructor(private http: HttpClient) {
    //  this.slots= UserUtils;

    this.getToadySlots();

  }

  formatHours(date: string) {
    console.log("data");

    const dat = new Date(date);

    dat.setHours(dat.getHours() - 2);

    const datepipe: DatePipe = new DatePipe('en-US')

    let formattedDate = datepipe.transform(dat, ' hh:mm a')


    return formattedDate;
  }

  formatDate(date: string, format: string) {

    const datepipe: DatePipe = new DatePipe('en-US')

    const dat = Date.parse(date);

    return datepipe.transform(dat, format);
  }


  async getToadySlots(): Promise<void> {
    this.http.get<SlotsModel>(ApiData.baseUrl + "/slot",
      {
        headers: {
          "authenticated": "key_" + UserUtils.token
        }
      }).subscribe(
      (data) => {
        this.allSlots = [];
        console.log(data);

        for (let i = 0; i < data.slots.length; i++) {
          // console.log("enterrr slot");
          if (data.slots[i].appointment != null) {
            console.log(i);
            this.allSlots.push(data.slots[i]);
            console.log(this.allSlots)
          }
        }
        console.log(this.allSlots)
      }
    );
  }
}
