import { Volunteer } from './../comp/volunteers/volunteer';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Activity } from '../comp/activities/activity';
import { Blog } from '../comp/blog/blog';
import { ProjectCalendar } from '../models/projectCalendar';
import { ActivityCalendar } from '../models/activityCalendar';
import { userModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class SYGDatabaseService {
  constructor(private firestore: AngularFirestore) {}

  ActivityData: Observable<Activity[]>;
  VolunteerData: Observable<Volunteer[]>;

  ReadBlogs() {
    return this.firestore
      .collection('Blog')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Blog;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  GetActivities(): Observable<Activity[]> {
    return this.firestore
      .collection('Activity')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Activity;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  GetVolunteers(): Observable<Volunteer[]> {
    return this.firestore
      .collection('Volunteer')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Volunteer;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  /*
  GetVolunteer(id: string){
    return this.firestore
      .collection('Volunteer')
      .doc(id);
  }
  */

  getProjectData():Observable<ProjectCalendar[]> {
    return this.firestore.collection('ProjectCalendar')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as ProjectCalendar;
          const id = a.payload.doc.id;

          const dateData = a.payload.doc.data()  as any;
          const sDate = dateData.start.toDate();
          const eDate = dateData.end.toDate();
          data.start = sDate;
          data.end = eDate;

          return { id, ...data };
        });
      })
    );
  }

  createNewProjectEvent(projectEvent: ProjectCalendar): void{
    this.firestore.collection('ProjectCalendar').add(projectEvent);
  }

  updateProjectEvent(event: ProjectCalendar){
    this.firestore.collection('ProjectCalendar').doc(event.id.toString()).update({
      allDay: event.allDay,
      start: event.start,
      end: event.end,
      title: event.title,
      description: event.description,
      extendendProps: {
        leadVolunteer: event.extendendProps.leadVolunteer,
        specialNotes: event.extendendProps.specialNotes
      }
    });
  }

  getActivityCalendarData():Observable<ActivityCalendar[]> {
    return this.firestore.collection('ActivityCalendar')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as ActivityCalendar;
          const id = a.payload.doc.id;

          const dateData = a.payload.doc.data()  as any;
          const sDate: Date = dateData.start.toDate();
          const eDate: Date = dateData.end.toDate();
          data.start = sDate;

          switch(data.VolunteerUIDs.length){
            case 0: {
              data.title = "2 volunteers needed";
              break;
            }
            case 1: {
              data.title = "1 more volunteer needed";
              break;
            }
            default: {
              data.title = "Open";
              break;
            }
          }
          
          data.start = sDate;
          data.end = eDate;

          return { id, ...data };
        });
      })
    );
  }

  getUsers(): Observable<userModel[]>{
    return this.firestore.collection('Users')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(a => {
          const queryData: any = a.payload.doc.data();
          const data = a.payload.doc.data() as userModel;
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }
}
