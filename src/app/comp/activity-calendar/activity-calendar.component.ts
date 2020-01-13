import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import {
  NgbModal,
  ModalDismissReasons,
  NgbTimeStruct
} from "@ng-bootstrap/ng-bootstrap";
import { OptionsInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGrid from "@fullcalendar/timegrid";
import { SYGDatabaseService } from "src/app/service/sygdatabase.service";
import { ProjectCalendar } from "src/app/models/projectCalendar";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Volunteer } from "../../models/volunteer";
import $ from "jquery";
import { Calendar } from "@fullcalendar/core";
import { ActivityCalendar } from "src/app/models/activityCalendar";
import { userModel } from "src/app/models/userModel";

@Component({
  selector: "app-activity-calendar",
  templateUrl: "./activity-calendar.component.html",
  styleUrls: ["./activity-calendar.component.css"]
})
export class ActivityCalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin];
  calendarEvents: ActivityCalendar[];

  // for modal
  closeResult: string;
  modalTitle: string;
  modalDate: string;
  btnText: string = "";

  // Current user information
  users: userModel[] = new Array<userModel>();
  currentUser: userModel;
  isValidRole: boolean = false;
  ActivityList: string[];
  VolunteerList: string[] = new Array<string>();
  alreadyVolunteered: boolean = false;

  constructor(
    private modalService: NgbModal,
    private svc: SYGDatabaseService,
    private authsv: AuthService
  ) {}

  options: OptionsInput;
  eventsModel: any;
  @ViewChild("fullcalendar", { static: false })
  fullcalendar: FullCalendarComponent;

  ngOnInit() {
    this.svc
      .getActivityCalendarData()
      .subscribe(data => (this.calendarEvents = data));

    this.svc.getUsers().subscribe(data => {
      data.forEach(element => {
        if (element.UserUID == this.authsv.user.uid) {
          this.currentUser = element;
        }
      });
    });

    this.svc.getUsers().subscribe(data => {
      data.forEach(element => {
        for (let i = 0; i < element.Role.length; i++) {
          if (element.Role[i].toLowerCase() == "volunteer") {
            this.users.push(element);
          }
        }
      });
    });

    this.options = {
      editable: true,
      customButtons: {
        myCustomButton: {
          text: "custom!",
          click: function() {
            alert("clicked the custom button!");
          }
        }
      },
      header: {
        left: "dayGridMonth, dayGridWeek",
        center: "title",
        right: "today, prev, next"
      },
      plugins: [dayGridPlugin, interactionPlugin, timeGrid]
    };
  }

  eventClick(model, content) {
    this.modalTitle = "Date: ";
    this.modalDate = this.getDateOnlyString(model.event.start);
    this.btnText = "Close";

    for (let i = 0; i < this.currentUser.Role.length; i++) {
      if (
        this.currentUser.Role[i] == "Volunteer" ||
        this.currentUser.Role[i] == "Admin"
      ) {
        this.isValidRole = true;
      }
    }

    this.ActivityList = new Array<string>();
    this.VolunteerList = new Array<string>();
    for (let i = 0; i < this.users.length; i++) {
      for (let j = 0; j < model.event.extendedProps.VolunteerUIDs.length; j++) {
        if(this.users[i].UserUID != null){
          if(model.event.extendedProps.VolunteerUIDs[j] == this.users[i].UserUID){
            
            this.users[i].Activities.forEach(act => {
              let alreadyOnList = false;
              for (let k = 0; k < this.ActivityList.length; k++) {
                if (act.Name == this.ActivityList[k]) {
                  alreadyOnList = true;
                }
              }
              if (!alreadyOnList) {
                this.ActivityList.push(act.Name);
              }
            });
          }
        }
      }
    }

    this.VolunteerList = new Array<string>();
    for (let i = 0; i < this.users.length; i++) {
      for (let j = 0; j < model.event.extendedProps.VolunteerUIDs.length; j++) {
        if(this.users[i].UserUID != null){
          if(model.event.extendedProps.VolunteerUIDs[j] == this.users[i].UserUID){
            this.VolunteerList.push(this.users[i].FirstName + " " + this.users[i].LastName);
          }
        }
      }
    }

    this.alreadyVolunteered = false;
    for (let i = 0; i < model.event.extendedProps.VolunteerUIDs.length; i++) {
      if (this.currentUser.UserUID == model.event.extendedProps.VolunteerUIDs[i]) {
        this.alreadyVolunteered = true;
      }
    }

    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {

          let volunteerArray = model.event.extendedProps.VolunteerUIDs;
          
          switch(result){
            case "remove":
              if(this.alreadyVolunteered){
                volunteerArray.splice(volunteerArray.indexOf(this.currentUser.UserUID), 1 );
              }
              break;
            case "add":
              if(!this.alreadyVolunteered){
                volunteerArray.push(this.currentUser.UserUID);
              }
              break;
            case "close":
              this.closeResult = `Closed with: ${result}`;
              this.isValidRole = false;
              break;
          }
          let eDate = (model.event.end == null) ? model.event.start : model.event.end;
          let actEvent: ActivityCalendar = {
            id: model.event.id,
            start: model.event.start,
            end: eDate,
            VolunteerUIDs: volunteerArray,
            MemberUIDs: model.event.extendedProps.MemberUIDs
          };
          this.svc.updateActivityEvent(actEvent);

        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.isValidRole = false;
        }
      );
  }

  dateClick(model, content) {
    this.ActivityList = new Array<string>();
    this.VolunteerList = new Array<string>();
    this.alreadyVolunteered = false;

    let d = new Date(model.date).getDay();
    let isValidDay = d == 1 || d == 3 || d == 5 ? true : false;

    for (let i = 0; i < this.currentUser.Role.length; i++) {
      if (
        this.currentUser.Role[i] == "Volunteer" ||
        this.currentUser.Role[i] == "Admin"
      ) {
        this.isValidRole = true;
      }
    }

    if (isValidDay) {
      this.modalTitle = "Date: ";
      this.modalDate = model.dateStr;
      this.btnText = "Close";

      this.modalService
        .open(content, { ariaLabelledBy: "modal-basic-title" })
        .result.then(
          result => {
            switch(result){
              case "add":
                let volunteers = new Array;
                volunteers.push(this.currentUser.UserUID)
                let actEvent: ActivityCalendar = {
                  start: model.date,
                  end: model.date,
                  VolunteerUIDs: volunteers,
                  MemberUIDs: new Array
                };
                this.svc.createNewActivityEvent(actEvent);
                break;
              case "close":
                this.closeResult = `Closed with: ${result}`;
                this.isValidRole = false;
                break;
            }
          },
          reason => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.isValidRole = false;
          }
        );
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  getDateTimeFormat(date: string, hour: any, minute: any): Date {
    hour = hour.toString().length == 1 ? "0" + hour : hour;
    minute = minute.toString().length == 1 ? "0" + minute : minute;
    let dateString = date + "T" + hour + ":" + minute + ":00";
    return new Date(dateString);
  }

  getDateOnlyString(theDate: Date): string {
    if (theDate != null) {
      // format date
      let year = theDate.getFullYear();
      let month = (theDate.getMonth() + 1).toString();
      let day = theDate.getDate().toString();

      month = month.length < 2 ? "0" + month : month;
      day = day.length < 2 ? "0" + day : day;
      // assign new format
      return year + "-" + month + "-" + day;
    } else {
      return null;
    }
  }
}
 