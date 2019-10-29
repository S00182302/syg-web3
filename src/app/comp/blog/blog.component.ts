import { Component, OnInit } from '@angular/core';
import { SYGDatabaseService } from 'src/app/service/sygdatabase.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public isCollapsed: boolean[] = [];
  items: any;

  constructor(private fireBaseService: SYGDatabaseService) {}

  ngOnInit() {
    this.fireBaseService.ReadBlogs().subscribe(result => {
      this.items = result;
    });
  }
}
