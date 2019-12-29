import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { SYGDatabaseService } from 'src/app/service/sygdatabase.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  calendarPlugins = [dayGridPlugin];
  calendarEvents: any[];

  constructor(private svc: SYGDatabaseService) {
    
   }

  ngOnInit() {
    this.svc.getProjectData().subscribe(data => this.calendarEvents = data);
  }

}
