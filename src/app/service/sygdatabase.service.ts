import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Activity } from '../comp/activities/activity';

@Injectable({
  providedIn: 'root'
})
export class SYGDatabaseService {
  constructor(private firestore: AngularFirestore) {}

  ActivityData: Observable<Activity[]>;

  ReadBlogs() {
    return this.firestore.collection('Blog').snapshotChanges();
  }

  GetActivities(): Observable<Activity[]> {
    return this.firestore.collection('Activity').snapshotChanges().pipe(map( changes => {
      return changes.map(a => {
          const data = a.payload.doc.data() as Activity;
          const id = a.payload.doc.id;
          return { id, ...data };
      });
    }));
  }
}
