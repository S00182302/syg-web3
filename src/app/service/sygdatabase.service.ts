import { Volunteer } from "../models/volunteer";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Activity } from "../models/activity";
import { Blog } from "../models/blog";
import { ProjectCalendar } from "../models/projectCalendar";
import { ActivityCalendar } from "../models/activityCalendar";
import { userModel } from "../models/userModel";

@Injectable({
  providedIn: "root"
})
export class SYGDatabaseService {
  constructor(private firestore: AngularFirestore) {}

  ActivityData: Observable<Activity[]>;
  VolunteerData: Observable<Volunteer[]>;

  ReadBlogs() {
    return this.firestore
      .collection("Blog")
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
      .collection("Activity")
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Activity;
            const id = a.payload.doc.id;
            return { id, name, ...data };
          });
        })
      );
  }

  createActivity(activity: Activity) {
    this.firestore.collection("Activity").add(activity);
  }

  GetVolunteers(): Observable<Volunteer[]> {
    return this.firestore
      .collection("Volunteer")
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

  getProjectData(): Observable<ProjectCalendar[]> {
    return this.firestore
      .collection("ProjectCalendar")
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as ProjectCalendar;
            const id = a.payload.doc.id;

            const dateData = a.payload.doc.data() as any;
            const sDate = dateData.start.toDate();
            const eDate = dateData.end.toDate();
            data.start = sDate;
            data.end = eDate;

            return { id, ...data };
          });
        })
      );
  }

  createBlog(blog: Blog) {
    this.firestore.collection("Blog").add(blog);
  }

  createNewProjectEvent(projectEvent: ProjectCalendar): void {
    this.firestore.collection("ProjectCalendar").add(projectEvent);
  }

  joinData(newUser: userModel): void {
    this.firestore.collection("Users").add(newUser);
  }

  updateProjectEvent(event: ProjectCalendar) {
    this.firestore
      .collection("ProjectCalendar")
      .doc(event.id.toString())
      .update({
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

  getActivityCalendarData(): Observable<ActivityCalendar[]> {
    return this.firestore
      .collection("ActivityCalendar")
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as ActivityCalendar;
            const id = a.payload.doc.id;

            const dateData = a.payload.doc.data() as any;
            const sDate: Date = dateData.start.toDate();
            const eDate: Date = dateData.end.toDate();
            data.start = sDate;

            switch (data.VolunteerUIDs.length) {
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

  updateActivityEvent(event: ActivityCalendar) {
    this.firestore
      .collection("ActivityCalendar")
      .doc(event.id)
      .update({
        start: event.start,
        VolunteerUIDs: event.VolunteerUIDs,
        MemberUIDs: event.MemberUIDs,
        end: event.end
      });
  }

  createNewActivityEvent(activityEvent: ActivityCalendar): void {
    this.firestore.collection("ActivityCalendar").add(activityEvent);
  }

  getUsers(): Observable<userModel[]> {
    return this.firestore
      .collection("Users")
      .snapshotChanges()
      .pipe( 
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as userModel;
            const id = a.payload.doc.id;

            return { id, Email: data.Email, ...data };
          });
        })
      );
  }

  deleteProject(id: string){
    this.firestore
    .collection("ProjectCalendar")
    .doc(id)
    .delete();
  }

  deleteActivity(id: string){
    this.firestore
    .collection("Activity")
    .doc(id)
    .delete();
  }
}
