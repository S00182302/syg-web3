import { Component, OnInit } from '@angular/core';
import { SYGDatabaseService } from 'src/app/service/sygdatabase.service';
import { Activity } from './activity';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  activities: Activity[];

  constructor(private fireService: SYGDatabaseService) {}

  ngOnInit() {
    this.fireService.GetActivities().subscribe(result => {
      this.activities = result;
    });
  }
}
