import { Component, OnInit } from "@angular/core";
import { SYGDatabaseService } from "src/app/service/sygdatabase.service";
import { Activity } from "../../models/activity";
import { AuthService } from "src/app/service/auth.service";
import { Router } from "@angular/router";
import { userModel } from "../../models/userModel";

@Component({
  selector: "app-activities",
  templateUrl: "./activities.component.html",
  styleUrls: ["./activities.component.css"]
})
export class ActivitiesComponent implements OnInit {
  activities: Activity[];
  isLoggedIn: boolean = false;
  isValidRole: boolean; 

  constructor(
    private fireService: SYGDatabaseService,
    private auth: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.isRequiredRole("admin");
    //uvalidRole.subscribe(myBool => this.isValidRole = myBool);
    console.log(this.isValidRole);

    this.fireService.GetActivities().subscribe(result => {
      this.activities = result;
    });
  }

  isRequiredRole(role: string) {
    let currentUser: userModel;

    this.fireService.getUsers().subscribe(data => {
      data.forEach(element => {
        if (element.UserUID != null && this.auth.user != null) {
          if (element.UserUID === this.auth.user.uid) {
            currentUser = element;
            console.log("matched");

            if (currentUser != null) {
              currentUser.Role.forEach(r => {
                if (r.toLowerCase() === role.toLowerCase()) {
                  this.isValidRole = true;
                  return false;
                }
              });
            }
          }
        }
      });
    });

    return false;
  }
}
