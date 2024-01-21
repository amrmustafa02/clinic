import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiData} from "../../api.data";
import {UserUtils} from "../utils/user.utils";
import {GetMessagesResponseBody, Message} from "../../models/home-doctor/messages_repsonse_body";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-messages-nav-doctor',
  templateUrl: './messages-nav-doctor.component.html',
  styleUrls: ['./messages-nav-doctor.component.css']
})
export class MessagesNavDoctorComponent {

  messages: Message[] = [];

  constructor(private http: HttpClient) {
    this.getMessages()
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
  getMessages() {
    this.http.get<GetMessagesResponseBody>(ApiData.baseUrl + "/message/getAllMessages", {
      headers: {
        "authenticated": "key_" + UserUtils.token
      }
    }).subscribe(
      (data) => {
        console.log(data);
        this.messages = data.messages;
      }
    );
  }

  refresh(){
    this.messages = [];
    this.getMessages();
  }
}
