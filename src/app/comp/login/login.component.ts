import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  responseMessage: string = "";
  responseMessageType: string = "";
  emailInput: string;
  passwordInput: string;
  isForgotPassword: boolean;
  userDetails: any; 

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit() {}

  //Login user with  provided Email/ Password
  Login() {
    this.responseMessage = "";
    this.authService.login(this.emailInput, this.passwordInput).then(
      res => {
        console.log(res);
        this.ShowMessage("success", "Successfully Logged In!");
        this.authService.setUser();
        this.IsUserLoggedIn();
        this.router.navigate(["home"]);
      },
      err => {
        this.ShowMessage("danger", err.message);
      }
    );
  }

  //Check localStorage is having User Data
  IsUserLoggedIn() {
    this.userDetails = this.authService.isLoggedIn();
  }

  //Common Method to Show Message and Hide after 2 seconds
  ShowMessage(type, msg) {
    this.responseMessageType = type;
    this.responseMessage = msg;
  }
}
