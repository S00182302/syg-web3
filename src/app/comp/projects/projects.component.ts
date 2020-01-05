import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar, OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SYGDatabaseService } from 'src/app/service/sygdatabase.service';
import { ProjectCalendar } from 'src/app/models/projectCalendar';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { NgbModal, ModalDismissReasons, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Volunteer } from '../volunteers/volunteer';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  calendarPlugins = [dayGridPlugin];
  calendarEvents: ProjectCalendar[];

  // for modal
  closeResult: string;
  modalTitle: string;
  modalDate: string;
  multiDay: boolean = false;
  fullDay: boolean = false;

  form1 = new FormGroup({
    allDayEvent: new FormControl(),
    multiDayEvent: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    startTime: new FormControl('',[Validators.required]),
    endTime: new FormControl('',[Validators.required]),
    title: new FormControl('',[Validators.required, Validators.minLength(50)]),
    volunteer: new FormControl('',[Validators.required]),
    description: new FormControl(),
  });

  volunteers: Volunteer[];

  constructor(private svc: SYGDatabaseService, private modalService: NgbModal) {
    
  }

  options: OptionsInput;
  eventsModel: any;
  @ViewChild('fullcalendar', {static: false}) fullcalendar: FullCalendarComponent;

  ngOnInit() {
    this.svc.getProjectData().subscribe(data => this.calendarEvents = data);
    this.svc.GetVolunteers().subscribe(result => {
      this.volunteers = result;
    });

    this.options = {
      editable: true,
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function () {
            alert('clicked the custom button!');
          }
        }
      },
      header: {
        left: 'dayGridMonth, dayGridWeek, dayGridDay',
        center: 'title',
        right: 'today, prev, next, myCustomButton'
      },
      plugins: [dayGridPlugin, interactionPlugin]
    };

  }
  eventClick(model, content) {
    //console.log(model);
    this.modalTitle = "Edit Event";
    this.modalDate = this.getDateOnlyString(model.event.start);
    // populate fields from model
    /* form controls */
      this.fullDay = model.event.allDay;
      this.allDayEvent.setValue(model.event.allDay);
      // check if multi day
      let startPlus24 = model.event.start.getTime() + (1 * 24 * 60 * 60 * 1000);
      let endTimeModel: Date = model.event.end;
      if(endTimeModel != null){
        if(endTimeModel.getTime() > startPlus24){
            this.multiDay = true;
        }
        this.endDate.setValue({
          year: parseInt(endTimeModel.getUTCFullYear()+"", 10),
          month: parseInt((endTimeModel.getMonth()+1)+"", 10),
          day: parseInt(endTimeModel.getDate()+"", 10)
        });
      }
      this.multiDayEvent.setValue(this.multiDay);
      if(model.event.start != null){
        this.startTime.setValue({
          hour: model.event.start.getHours(), 
          minute: model.event.start.getMinutes()
        });
      }
      if(model.event.end != null){
        this.endTime.setValue({
          hour: model.event.end.getHours(), 
          minute: model.event.end.getMinutes()
        });
      }else if(model.event.start != null){
        this.endTime.setValue({
          hour: model.event.start.getHours(), 
          minute: model.event.start.getMinutes()
        });
      }
      this.title.setValue(model.event.title);
      let volunteerID = model.event.extendedProps.extendendProps.leadVolunteer;
      this.volunteer.setValue(volunteerID, {onlySelf: true});
      this.description.setValue(model.event.extendedProps.description);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.UpdateProjectEvent(model);
    }, (reason) => {
      this.resetFormData();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  eventDragStop(model) {
    //console.log(model);
  }

  eventDrop(model) {
    let newCalendarEvent: ProjectCalendar;
    let start = model.event.start;
    let end = model.event.end;

    newCalendarEvent = {
      id: model.event.id,
      start: start,
      end: end,
      title: model.event.title,
      description: model.event.extendedProps.description,
      extendendProps: {
        leadVolunteer: model.event.extendedProps.extendendProps.leadVolunteer, 
        specialNotes: model.event.extendedProps.extendendProps.specialNotes
      },
      allDay: model.event.allDay
    };

    this.svc.updateProjectEvent(newCalendarEvent);
    this.resetFormData();
  }


  dateClick(model, content) {
    this.modalTitle = "Add Event";
    this.modalDate = model.dateStr;

    //time picker
    this.startTime.setValue({hour: 8, minute: 30});
    this.endTime.setValue({hour: 9, minute: 30});

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.NewCalendarEvent(model);
    }, (reason) => {
      this.resetFormData();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  updateHeader() {
    this.options.header = {
      left: 'prev,next myCustomButton',
      center: 'title',
      right: ''
    };
  }
  updateEvents() {
    this.eventsModel = [{
      title: 'Updaten Event',
      start: this.yearMonth + '-08',
      end: this.yearMonth + '-10'
    }];
  }
  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  }

  // Modal controllers
  /*
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  // Check checkbox values
  checkMulti(values: any){
    this.multiDay = values.currentTarget.checked;
  }
  checkFullDay(values: any){
    this.fullDay = values.currentTarget.checked;
    if(this.fullDay){
      this.endDate.setValue(null);
    }else{
      if(this.endTime.value == null){
        this.endTime.setValue({
          hour: 10, 
          minute: 30
        });
      }
    }
  }

  // volunteer dropdown
  changeVolunteer(e) {
    this.volunteer.setValue(e.target.value, {
      onlySelf: true
    })
  }

  NewCalendarEvent(model: any){
    let sDate = (this.startDate.value == null ? model.dateStr : this.startDate.value );
    let eDate;
    if(this.endDate.value == null){
      // event end on same day
      eDate = sDate;
    } else {
      // event end date provided
      // format date
      let year = this.endDate.value.year;
      let month = this.endDate.value.month+"";
      let day = this.endDate.value.day+"";

      month = (month.length < 2 ? "0"+month : month)
      day = (day.length < 2 ? "0"+day : day)
      // assign new format
      eDate = year+"-"+month+"-"+day;
    }

    let newCalendarEvent: ProjectCalendar;
    let start;
    let end;

    if(this.allDayEvent.value)
    {
      start = new Date(sDate+"T00:00");
      end = new Date(sDate+"23:59:59");
    }
    else
    {
      start = this.getDateTimeFormat(sDate, this.startTime.value.hour, this.startTime.value.minute);
      end = this.getDateTimeFormat(eDate, this.endTime.value.hour, this.endTime.value.minute);
    }

    newCalendarEvent = {
      start: start,
      end: end,
      title: this.title.value,
      description: this.description.value,
      extendendProps: {
        leadVolunteer: this.volunteer.value, 
        specialNotes: "Not enabled yet..."
      },
      allDay: this.allDayEvent.value
    };
    this.svc.createNewProjectEvent(newCalendarEvent);
    this.resetFormData();
  }

  UpdateProjectEvent(model: any){
    let sDate;
    let sHour: NgbTimeStruct;
    let sMin: NgbTimeStruct;
    if(this.startDate.value == null){
      sDate = this.getDateOnlyString(model.event.start);
      sHour = model.event.start.getHours();
      sMin = model.event.start.getMinutes();
    }else{
      sDate = this.startDate.value;
      sHour = this.startTime.value.hour;
      sMin = this.startTime.value.minute;
    }
    
    
    let eDate;
    let eHour: NgbTimeStruct;
    let eMin: NgbTimeStruct;

    if(this.endDate.value == null){
      // event end on same day
      eDate = sDate;
      eHour = this.endTime.value.hour;
      eMin = this.endTime.value.minute;
    } else {
      // event end date provided
      // assign new format
      eDate = this.getDateOnlyString(new Date(this.endDate.value.year,this.endDate.value.month - 1,this.endDate.value.day));
      eHour = this.endTime.value.hour;
      eMin = this.endTime.value.minute;
    }
    console.log(this.startTime.value.hour)
    console.log(eHour)
    let newCalendarEvent: ProjectCalendar;
    let start;
    let end;

    if(this.allDayEvent.value)
    {
      start = new Date(sDate+"T00:00");
      end = new Date(sDate+"T23:59:59");
    }
    else
    {
      start = this.getDateTimeFormat(sDate, sHour, sMin);
      end = this.getDateTimeFormat(eDate, eHour, eMin);
    }

    newCalendarEvent = {
      id: model.event.id,
      start: start,
      end: end,
      title: this.title.value,
      description: this.description.value,
      extendendProps: {
        leadVolunteer: this.volunteer.value, 
        specialNotes: "Not enabled yet..."
      },
      allDay: this.allDayEvent.value
    };

    this.svc.updateProjectEvent(newCalendarEvent);
    this.resetFormData();
  }

  resetFormData(){
    this.form1.reset();
    this.multiDay = false;
    this.fullDay = false;
  }

  getDateTimeFormat(date: string, hour: any, minute: any):Date{
    hour = (hour.toString().length == 1 ? "0"+hour : hour);
    minute = (minute.toString().length == 1 ? "0"+minute : minute);
    let dateString = date+'T'+hour+":"+minute+":00";
    return new Date(dateString);
  }

  getDateOnlyString(theDate: Date): string {
    if(theDate != null){
      // format date
      let year = theDate.getFullYear();
      let month = (theDate.getMonth() + 1).toString();
      let day = theDate.getDate().toString();

      month = (month.length < 2 ? "0"+month : month)
      day = (day.length < 2 ? "0"+day : day)
      // assign new format
      return year+"-"+month+"-"+day;
    }else{
      return null;
    }
  }

  // form data
  get allDayEvent () { return this.form1.get('allDayEvent')}
  get multiDayEvent () { return this.form1.get('multiDayEvent')}
  get startDate () { return this.form1.get('startDate')}
  get endDate () { return this.form1.get('endDate')}
  get startTime () { return this.form1.get('startTime')}
  get endTime () { return this.form1.get('endTime')}
  get title () { return this.form1.get('title')}
  get volunteer () { return this.form1.get('volunteer')}
  get description () { return this.form1.get('description')}

}
