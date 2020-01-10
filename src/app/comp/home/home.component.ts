import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { AuthService } from "src/app/service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  featuredImg: string = "assets/images/youth-group.jpg";
  userDetails: any;

  constructor() {}

  ngOnInit() {
    //this.loginCheck();
  }
}
