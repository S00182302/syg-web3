import { Component, OnInit } from "@angular/core";
import { SYGDatabaseService } from "src/app/service/sygdatabase.service";
import { userModel } from "../../models/userModel";
import { Router } from "@angular/router";
import { Volunteer } from "../../models/volunteer";

@Component({
  selector: "app-volunteers",
  templateUrl: "./volunteers.component.html",
  styleUrls: ["./volunteers.component.css"]
})
export class VolunteersComponent implements OnInit {
  volunteers1: string = "assets/images/carousel/volunteers1.jpg";
  volunteers2: string = "assets/images/carousel/volunteers2.jpg";
  volunteers3: string = "assets/images/carousel/volunteers3.jpg";
  images = [1, 2, 3].map(() => [
    "assets/images/carousel/volunteers1.jpg",
    "assets/images/carousel/volunteers2.jpg",
    "assets/images/carousel/volunteers3.jpg"
  ]);

  volunteers: userModel[] = new Array();
  constructor(
    private fireService: SYGDatabaseService,
    private _router: Router
  ) {}

  redirectToSignUp() {
    this._router.navigate(["join"]);
  }

  ngOnInit() {
    /* // placeholder data
    this.fireService.GetVolunteers().subscribe(result => {
      this.volunteers = result;
    });
    */ 

    this.fireService.getUsers().subscribe(result => {
      result.forEach(user => {
        user.Role.forEach(r => {
          if (r.toLowerCase() == "volunteer") {
            this.volunteers.push(user);
          }
        });
      });
    });
  }
}
