import { Component, OnInit } from "@angular/core";
import { SYGDatabaseService } from "src/app/service/sygdatabase.service";
import { AuthService } from "src/app/service/auth.service";
import { Router } from "@angular/router";
import { userModel } from "../../models/userModel";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"]
})
export class BlogComponent implements OnInit {
  public isCollapsed: boolean[] = [];
  items: any;
  isLoggedIn: boolean = false;
  isValidRole: boolean = false;

  constructor( 
    private fireBaseService: SYGDatabaseService,
    private auth: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.isRequiredRole("admin");

    this.fireBaseService.ReadBlogs().subscribe(result => {
      this.items = result;
    });
  }

  isRequiredRole(role: string) {
    let currentUser: userModel;

    this.fireBaseService.getUsers().subscribe(data => {
      data.forEach(element => {
        if (element.UserUID != null && this.auth.user != null) {
          if (element.UserUID === this.auth.user.uid) {
            currentUser = element;
            console.log("matched");

            if (currentUser != null) {
              currentUser.Role.forEach(r => {
                if (r.toLowerCase() === role.toLowerCase()) {
                  this.isValidRole = true;
                  return false;
                }
              });
            }
          }
        }
      });
    });
    return false;
  }
}
