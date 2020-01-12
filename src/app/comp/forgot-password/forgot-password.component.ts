import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
  emailInput: string;
  isForgotPassword: boolean;
  responseMessageType: string;
  responseMessage: string;

  constructor(private authService: AuthService, public router: Router) {}

  // Send link on given email to reset password
  ForgotPassword() { 
    this.authService.sendPasswordResetEmail(this.emailInput).then(
      res => {
        console.log(res);
        this.isForgotPassword = false;
        this.ShowMessage("success", "Please Check Your Email");
      },
      err => {
        this.ShowMessage("danger", err.message);
      }
    );
  }

  ShowMessage(type, msg) {
    this.responseMessageType = type;
    this.responseMessage = msg;
  }

  ngOnInit() {}
}
