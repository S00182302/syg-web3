import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../../models/activity';
import { AuthService } from "src/app/service/auth.service";
import { userModel } from "../../models/userModel";
import { SYGDatabaseService } from "../../service/sygdatabase.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @Input() activity: Activity;

  constructor() {}

  ngOnInit() {}
}
