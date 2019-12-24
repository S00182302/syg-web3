import { Component, OnInit, HostListener } from '@angular/core';
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
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isCollapsed = true;
  }

  ngOnInit() {
    this.loginCheck();
  }

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

  //Checks if User Is Logged in
  IsUserLoggedIn() {
    return (this.userDetails = this.authService.isLoggedIn());
  }

  // Funtion to check if user is logged in Asynchronously
  async loginCheck() {
    const user = await this.IsUserLoggedIn();
    if (user) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
  
}
