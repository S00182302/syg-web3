import { Router } from "@angular/router";
import { Volunteer } from "../../models/volunteer";
import { Component, OnInit } from "@angular/core";
import { HttpService } from "../Shared/http.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {
  //Sligo
  latitude = 54.27148460000001;
  longitude = -8.4822739;
  locationChosen = false;
  //Mark another location
  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
  }

  constructor(public http: HttpService) {}

  myGroup = new FormGroup({
    nameFormControl: new FormControl("", [Validators.required]),
    emailFormControl: new FormControl("", [Validators.required]),
    userType: new FormControl("", [Validators.required]),
    messageFormControl: new FormControl("", [Validators.required])
  });

  //Data
  get name() {
    return this.myGroup.get("nameFormControl");
  }
  get email() {
    return this.myGroup.get("emailFormControl");
  }
  get userType() {
    return this.myGroup.get("userType");
  }
  get message() {
    return this.myGroup.get("messageFormControl");
  }

  ngOnInit() {}

  sendMessage() {
    let output = {
      name: this.name.value,
      email: this.email.value,
      userType: this.userType.value,
      message: this.message.value
    };

    this.http
      .sendEmail("https://sygnodemailer.herokuapp.com/send", output)
      .subscribe(
        data => {
          let res: any = data;
          console.log(`Mail has been sent.`);
        },
        err => {
          console.log(err);
        }
      );

    //Clears all Input fields on form
    this.myGroup.reset(); 
  }
}
