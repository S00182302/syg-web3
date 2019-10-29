import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SYGDatabaseService {
  constructor(private firestore: AngularFirestore) {}

  ReadBlogs() {
    return this.firestore.collection('Blog').snapshotChanges();
  }
}
