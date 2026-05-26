import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { collection, query, Timestamp, where } from 'firebase/firestore';
import { collectionData } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TracksService {

  constructor(private firestore: Firestore) { }

  getInfoTracksByDate(teamMembersIds: any[], fromDate: Date, toDate: Date): Observable<any[]> {

    const ordersRef = collection(this.firestore, 'infos');

    const q = query(
      ordersRef,
      where('teamMemberId', 'in', teamMembersIds),
      where('date', '>=', Timestamp.fromDate(fromDate)),
      where('date', '<=', Timestamp.fromDate(toDate))
    );

    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }
}
