import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/service/auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SYGDatabaseService } from "src/app/service/sygdatabase.service";
import { userModel } from "src/app/models/userModel";
import { Router } from "@angular/router";
import { HttpEventType, HttpClient } from "@angular/common/http";

@Component({
  selector: "app-join",
  templateUrl: "./join.component.html",
  styleUrls: ["./join.component.css"]
})
export class JoinComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private sygDB: SYGDatabaseService,
    public router: Router,
    private http: HttpClient
  ) {}

  //Declaring Variables
  userDetails: any;
  isForgotPassword: boolean;
  responseMessage: string = null;
  responseMessageType: string = "";
  newUser: userModel;
  typeSelect: string;
  newUserUID: string;
  filename: string;
  selectedFile: File;

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
          this.newUserUID = res.user.uid;
          this.dataPush();
          this.router.navigate(["login"]);
        },
        err => {
          this.ShowMessage("danger", err.message);
        }
      );
  }
  //Getting Selected file
  onFileChanged(event) {
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  //Bretts Code for Uploading Image
  onUpload() {
    const uploadData = new FormData();
    uploadData.append("fileToUpload", this.selectedFile, this.filename); //this.selectedFile.name);
    this.http
      .post("https:bretthenning.com/svg/upload.php", uploadData, {
        reportProgress: true,
        observe: "events"
      })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log(
            "Upload Progress:  " +
              Math.round((event.loaded / event.total) * 100) +
              "%"
          );
        }
      });
  }

  //Pushing the form data to the Database
  async dataPush() {
    if (this.userType.value == "Member") {
      this.newUser = {
        FirstName: this.firstName.value,
        LastName: this.lastName.value,
        Age: this.age.value,
        Email: this.emailInput.value.toLowerCase(),
        Mobile: this.mobile.value,
        Role: ["Member"],
        Activities: this.assistActivities,
        Hobbies: this.skills.value,
        UserUID: this.newUserUID,
        WeekdaysAttending: this.daysSelected,
        GardaVetting: this.gardaVettting.value,
        ContactFirstName: this.contactFirstName.value,
        ContactLastName: this.contactLastName.value,
        ContactAge: this.contactAge.value,
        ContactEmailInput: this.contactEmailInput.value,
        ContactMobile: this.contactMobile.value
      };
      this.sygDB.joinData(this.newUser);
    } else if (this.userType.value == "Volunteer") {
      this.uploadImage();
      this.newUser = {
        FirstName: this.firstName.value,
        LastName: this.lastName.value,
        Age: this.age.value,
        Email: this.emailInput.value.toLowerCase(),
        Mobile: this.mobile.value,
        Role: ["Volunteer"],
        Activities: this.assistActivities,
        Hobbies: this.skills.value,
        UserUID: this.newUserUID,
        WeekdaysAttending: this.daysSelected,
        GardaVetting: this.gardaVettting.value,
        FeaturedImage: "https://bretthenning.com/svg/uploads/" + this.filename,
        Description: this.descriptionText.value
      };
      this.sygDB.joinData(this.newUser);
    }
  }

  //Uploading Image for Volunteer
  uploadImage() {
    this.filename =
      new Date().getTime().toString() +
      this.selectedFile.name.substr(this.selectedFile.name.lastIndexOf("."));
    console.log(this.filename);
    this.onUpload();
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
  get descriptionText() {
    return this.registerForm.get("descriptionText");
  }
  get contactFirstName() {
    return this.registerForm.get("contactFirstName");
  }
  get contactLastName() {
    return this.registerForm.get("contactLastName");
  }
  get contactAge() {
    return this.registerForm.get("contactAge");
  }
  get contactEmailInput() {
    return this.registerForm.get("contactEmailInput");
  }
  get contactMobile() {
    return this.registerForm.get("contactMobile");
  }

  //FormGroup to control data validation and data handling
  registerForm = new FormGroup({
    userType: new FormControl("", [Validators.required]),
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    age: new FormControl("", [Validators.required]),
    emailInput: new FormControl("", [Validators.required, Validators.email]),
    passwordInput: new FormControl("", [Validators.required]),
    mobile: new FormControl("", [Validators.required]),
    descriptionText: new FormControl(""),
    involvement: new FormControl("", [Validators.required]),
    skills: new FormControl("", [Validators.required]),
    gardaVetting: new FormControl("", [Validators.required]),
    contactFirstName: new FormControl(""),
    contactLastName: new FormControl(""),
    contactAge: new FormControl(""),
    contactEmailInput: new FormControl(""),
    contactMobile: new FormControl("")
  });
}
