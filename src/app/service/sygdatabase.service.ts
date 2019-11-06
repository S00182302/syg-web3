import { Volunteer } from './../comp/volunteers/volunteer';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
}
