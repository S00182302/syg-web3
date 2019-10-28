import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logo = "../../assets/images/logo.png";
  isCollapsed: boolean;

  constructor() {
    this.isCollapsed = true;
   }

  ngOnInit() {
  }

}
