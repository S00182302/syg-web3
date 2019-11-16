import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  emailInput: string;

  constructor(private authService: AuthService, public router: Router) {}

  ForgotPassword() {
    this.authService.sendPasswordResetEmail(this.emailInput);
  }

  ngOnInit() {}
}
