import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/service/auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SYGDatabaseService } from "src/app/service/sygdatabase.service";
import { userModel } from "src/app/models/userModel";

@Component({
  selector: "app-join",
  templateUrl: "./join.component.html",
  styleUrls: ["./join.component.css"]
})
export class JoinComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private sygDB: SYGDatabaseService
  ) {}

  //Declaring Variables
  userDetails: any;
  isForgotPassword: boolean;
  responseMessage: string = null;
  responseMessageType: string = "";
  newUser: userModel;
  typeSelect: string;

  //Array That is being populated by selected activities upon registration
  assistActivities: Array<any> = [];

  //Array That is being populated by days selected upon registration
  daysSelected: Array<any> = [];

  //Days Object to hold name value and id to display on front end
  Days = [
    { name: "Monday", id: 1 },
    { name: "Wednesday", id: 2 },
    { name: "Friday", id: 3 }
  ];
  //Activities Defined for WebPage Checkboxes
  Activities: Array<any> = [];

  //Fills assistActivities Array when a checkbox is selected. And removes if unselected (Using this to push to firestore collection for Activities)
  onChange(activity: string, isChecked: boolean) {
    if (isChecked) {
      this.assistActivities.push(activity);
    } else {
      this.assistActivities = this.assistActivities.filter(a => a !== activity);
    }
  }
  //Fills daysSelected Array when a checkbox is selected. And removes if unselected (Using this to push to firestore collection for WeekDaysAttending)
  onChangeDays(days: string, isChecked: boolean) {
    if (isChecked) {
      this.daysSelected.push(days);
    } else {
      this.daysSelected = this.daysSelected.filter(a => a !== days);
    }
  }

  //Assigning value to typeSelect when either Member or Volunteered is selected. This is used for extra fields to dynamically display if Member is selected
  onUserChange(user: string, isChecked: boolean) {
    if (isChecked) {
      this.typeSelect = user;
    } else {
      this.typeSelect = user;
    }
  }

  //Registering User
  Register() {
    this.authService
      .register(this.emailInput.value, this.passwordInput.value)
      .then(
        res => {
          this.IsUserLoggedIn();
          this.ShowMessage("successful", "Succesful");
        },
        err => {
          this.ShowMessage("danger", err.message);
        }
      );
  }

  //Pushing the form data to the Database
  dataPush() {
    if (this.userType.value == "Member") {
      this.newUser = {
        FirstName: this.firstName.value,
        LastName: this.lastName.value,
        Age: this.age.value,
        Mobile: this.mobile.value,
        Role: ["Member"],
        Activities: this.assistActivities,
        Hobbies: this.skills.value,
        UserUID: null,
        WeekdaysAttending: this.daysSelected,
        FeaturedImage: null,
        Description: null
      };
      this.sygDB.joinData(this.newUser);
    } else if (this.userType.value == "Volunteer") {
      this.newUser = {
        FirstName: this.firstName.value,
        LastName: this.lastName.value,
        Age: this.age.value,
        Mobile: this.mobile.value,
        Role: ["Volunteer"],
        Activities: this.assistActivities,
        Hobbies: this.skills.value,
        UserUID: null,
        WeekdaysAttending: this.daysSelected,
        FeaturedImage: null,
        Description: null
      };
      this.sygDB.joinData(this.newUser);
    }
  }

  //Common Method to Error Show Message
  ShowMessage(type, msg) {
    this.responseMessageType = type;
    this.responseMessage = msg;
  }

  //Check localStorage has User Data
  IsUserLoggedIn() {
    this.userDetails = this.authService.isLoggedIn();
  }

  //Subscribing to activites in database so It makes the List dynamic when selecting
  ngOnInit() {
    this.sygDB.GetActivities().subscribe(result => {
      this.Activities = result;
    });
  }

  //Form Data
  get userType() {
    return this.registerForm.get("userType");
  }
  get firstName() {
    return this.registerForm.get("firstName");
  }
  get lastName() {
    return this.registerForm.get("lastName");
  }
  get age() {
    return this.registerForm.get("age");
  }
  get emailInput() {
    return this.registerForm.get("emailInput");
  }
  get passwordInput() {
    return this.registerForm.get("passwordInput");
  }
  get mobile() {
    return this.registerForm.get("mobile");
  }
  get involvement() {
    return this.registerForm.get("involvement");
  }
  get skills() {
    return this.registerForm.get("skills");
  }
  get gardaVettting() {
    return this.registerForm.get("gardaVetting");
  }

  //FormGroup to control data validation and data handling
  registerForm = new FormGroup({
    userType: new FormControl("", [Validators.required]),
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    age: new FormControl("", [Validators.required]),
    emailInput: new FormControl("", [Validators.required]),
    passwordInput: new FormControl("", [Validators.required]),
    mobile: new FormControl("", [Validators.required]),
    involvement: new FormControl("", [Validators.required]),
    skills: new FormControl("", [Validators.required]),
    gardaVetting: new FormControl("", [Validators.required]),
    contactFirstName: new FormControl("", [Validators.required]),
    contactLastName: new FormControl("", [Validators.required]),
    contactAge: new FormControl("", [Validators.required]),
    contactEmailInput: new FormControl("", [Validators.required]),
    contactMobile: new FormControl("", [Validators.required])
  });
}
