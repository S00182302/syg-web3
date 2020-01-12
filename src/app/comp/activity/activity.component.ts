import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../../models/activity';
import { AuthService } from "src/app/service/auth.service";
import { userModel } from "../../models/userModel";
import { SYGDatabaseService } from "../../service/sygdatabase.service";
import { Observable } from 'rxjs';

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.css"]
})
export class ActivityComponent implements OnInit {
  @Input() activity: Activity;
  isAdmin: boolean = false;

  constructor(private auth: AuthService, private svc: SYGDatabaseService) {}

  ngOnInit() {
    this.svc.getUsers().forEach(users => {
      users.forEach(u => {
        if(this.auth.user.uid === u.UserUID){
          u.Role.forEach(r => {
            if(r.toLowerCase() == "admin"){
              this.isAdmin = true;
            }
          }); 
        }
      });
    });
  }

  deleteActivity(act){
    this.svc.deleteActivity(act.id);
  }
}
