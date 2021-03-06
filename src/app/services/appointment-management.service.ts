import { Injectable } from '@angular/core';
import { IAppointment } from '../interfaces/iAppointment';
import { Router } from '@angular/router';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getFirestore,
  Firestore,
  deleteDoc,
} from '@angular/fire/firestore';
import { getDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AppointmentManagementService {
  db = getFirestore();

  constructor(private router: Router, private firestore: Firestore) {}

  public async getAppointment() {
    let appointments = await getDocs(collection(this.db, 'dates'));
    return appointments;
  }

  public async addAppointment(appointment: IAppointment) {
    await setDoc(doc(this.firestore, 'dates', appointment.id.toString()), {
      id: appointment.id,
      name: appointment.name,
      description: appointment.description,
      color: appointment.color,
      active: appointment.active,
      duration: appointment.duration,
      creationDate: appointment.creationDate,
      updateDate: appointment.updateDate,
    });

    this.router.navigate(['/home']);
  }

  public async editDoc(id: string) {
    let docSnap;
    if (id !== null) {
      docSnap = await getDoc(doc(this.db, 'dates', id));
    }
    return docSnap

  }

  public async deleteAppointment(id: number) {
    await deleteDoc(doc(this.db, 'dates', id.toString()));
  }
}
