import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css']
})
export class VolunteersComponent implements OnInit {
 volunteers1: string = "assets/images/carousel/volunteers1.jpg"

  constructor() { }

  ngOnInit() {
  }

}
