import { Volunteer } from './../comp/volunteers/volunteer';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Activity } from '../comp/activities/activity';
import { Blog } from '../comp/blog/blog';

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

  getProjectData():Observable<any[]> {
    let data = [
      { title: 'Brett Event', start: '2019-12-01' },
      { title: 'event 2', date: '2019-12-02' }
    ];

    return this.firestore.collection('ProjectCalendar')
    .valueChanges()
    .pipe(
      tap( events => console.log(events)),
      map( events => events.map(event => {
        let data:any = event;
        data.start = data.start.toDate();
        data.end = data.end.toDate();
        return data;
      }))
    );
  }
}
