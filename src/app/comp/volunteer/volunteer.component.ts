import { Component, OnInit, Input } from "@angular/core";
import { Volunteer } from "../../models/volunteer";
@Component({
  selector: "app-volunteer",
  templateUrl: "./volunteer.component.html",
  styleUrls: ["./volunteer.component.css"]
})
export class VolunteerComponent implements OnInit {
  @Input() volunteer: Volunteer;
  constructor() {}

  ngOnInit() {}
} 
