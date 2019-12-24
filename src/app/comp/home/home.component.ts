import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredImg: string = 'assets/images/youth-group.jpg';
  userDetails: any;

  constructor(private authService: AuthService, private router: Router) {}

  /*
  //Checks if User Is Logged in
  IsUserLoggedIn() {
    return (this.userDetails = this.authService.isLoggedIn());
  }

  // Funtion to check if user is logged in Asynchronously
  async loginCheck() {
    const user = await this.IsUserLoggedIn();
    if (user) {
      console.log('Logged In');
    } else {
      this.router.navigate(['login']);
    }
  }
  */

  ngOnInit() {
    //this.loginCheck();
  }
}
