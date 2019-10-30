import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {
  constructor(private authService: AuthService) {}

  emailInput: string;
  passwordInput: string;
  userDetails: any;
  isForgotPassword: boolean;
  responseMessage: string = '';
  responseMessageType: string = '';

  ngOnInit() {}

  Register() {
    this.authService.register(this.emailInput, this.passwordInput).then(
      res => {
        this.IsUserLoggedIn();
      },
      err => {
        this.ShowMessage('danger', err.message);
      }
    );
  }

  //Common Method to Show Message and Hide after 2 seconds
  ShowMessage(type, msg) {
    this.responseMessageType = type;
    this.responseMessage = msg;
    setTimeout(() => {
      this.responseMessage = '';
    }, 2000);
  }

  //Check localStorage is having User Data
  IsUserLoggedIn() {
    this.userDetails = this.authService.isLoggedIn();
  }
}
