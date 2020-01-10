import { Component, OnInit } from "@angular/core";
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

  isLoggedIn: boolean = false;

  constructor(private auth: AuthService, public router: Router) {

  }

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
  }
}
