import { Component, OnInit } from '@angular/core';
import { SYGDatabaseService } from 'src/app/service/sygdatabase.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private fireBaseService: SYGDatabaseService) { }
  sizeB:any;
  sizeA: any;
  sizeC: any;
  ngOnInit() {
    let countC = this.fireBaseService.GetVolunteers().subscribe(c => {
      return this.sizeC= c.length;
    });

    let countB = this.fireBaseService.ReadBlogs().subscribe(c => {
      return this.sizeB= c.length;
    });

    let countA = this.fireBaseService.GetActivities().subscribe(c => {
      return this.sizeA= c.length;
    });

  
    
  }
}
