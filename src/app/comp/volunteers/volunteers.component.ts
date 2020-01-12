import { Component, OnInit } from "@angular/core";
import { SYGDatabaseService } from "src/app/service/sygdatabase.service";
import { Volunteer } from "./Volunteer";
import { Router } from "@angular/router";

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

  volunteers: Volunteer[];
  constructor(
    private fireService: SYGDatabaseService,
    private _router: Router
  ) {}

  redirectToSignUp() {
    this._router.navigate(["join"]);
  }

  ngOnInit() {
    this.fireService.GetVolunteers().subscribe(result => {
      this.volunteers = result;
    });
  }
}
