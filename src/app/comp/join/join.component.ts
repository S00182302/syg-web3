import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/service/auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-join",
  templateUrl: "./join.component.html",
  styleUrls: ["./join.component.css"]
})
export class JoinComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("")
  });

  constructor(private authService: AuthService) {}

  emailInput: string;
  passwordInput: string;
  userDetails: any;
  isForgotPassword: boolean;
  responseMessage: string = "";
  responseMessageType: string = "";

  //Array That is being populated by selected activities upon registration
  assistActivities: Array<any> = [];

  //Activities Defined for WebPage Checkboxes
  Activities = [
    { name: "MUSIC", id: 1 },
    { name: "ART", id: 2 },
    { name: "DANCE", id: 3 },
    { name: "DRAMA", id: 4 },
    { name: "SPORTS", id: 5 },
    { name: "IT/GAMING", id: 6 }
  ];

  ngOnInit() {}

  //Fills assistActivities Array when a checkbox is selected. And removes if unselected (Using this to push to firestore collection)
  onChange(activity: string, isChecked: boolean) {
    if (isChecked) {
      this.assistActivities.push(activity);
    } else {
      this.assistActivities = this.assistActivities.filter(a => a !== activity);
    }
  }

  //Registering User
  Register() {
    this.authService.register(this.emailInput, this.passwordInput).then(
      res => {
        this.IsUserLoggedIn();
      },
      err => {
        this.ShowMessage("danger", err.message);
      }
    );
  }

  //Common Method to Show Message and Hide after 2 seconds
  ShowMessage(type, msg) {
    this.responseMessageType = type;
    this.responseMessage = msg;
    setTimeout(() => {
      this.responseMessage = "";
    }, 2000);
  }

  //Check localStorage has User Data
  IsUserLoggedIn() {
    this.userDetails = this.authService.isLoggedIn();
  }
}
