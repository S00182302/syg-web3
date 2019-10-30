import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logo = '../../assets/images/logo.png';
  isCollapsed: boolean;
  userDetails: any;
  responseMessage: string = '';
  responseMessageType: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.isCollapsed = true;
  }

  ngOnInit() {}

  //SignOut Firebase Session and Clean LocalStorage
  LogoutUser() {
    this.authService.logout().then(
      res => {
        console.log(res);
        this.userDetails = undefined;
        localStorage.removeItem('user');
        this.router.navigate(['login']);
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
}
