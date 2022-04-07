import { Component, OnInit } from '@angular/core';
import { IAppointment } from 'src/app/interfaces/iAppointment';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentManagementService } from 'src/app/services/appointment-management.service';
import moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  public listAppointments: any[] = [];
  public appointments: any[] = [];
  public appointmentEdit: any[] = [];

  public isModal: boolean = false;
  public deleteDoc: boolean = false;

  public id: number = 0;
  public idRoute: string = '';

  constructor(
    private serviceManagment: AppointmentManagementService,
    private router: Router
  ) {
    this.serviceManagment
      .getAppointment()
      .then((data) => {
        data.forEach((doc) => {
          this.listAppointments.push(doc.data());
        });
      })
      .finally(() => {
        this.appointments = this.listAppointments;
        for (let i = 0; i < this.listAppointments.length; i++) {
          this.appointments[i].creationDate = moment
            .unix(this.appointments[i].creationDate)
            .subtract(1969, 'year')
            .format('DD/MM/YYYY, h:mm:ss');

          // .format('DD-MM-YYYY');
          this.appointments[i].updateDate = moment
            .unix(this.appointments[i].updateDate)
            .subtract(1969, 'year')
            .format('DD/MM/YYYY, h:mm:ss');
          if (this.appointments[i].active === true) {
            this.appointments[i].active = 'Si';
          } else {
            this.appointments[i].active = 'No';
          }
        }
      });
  }

  ngOnInit(): void {}

  public isDelete(event: any) {
    this.closeModal(false);
    if (event == true) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  public editAppointment(position: number) {
    this.id = this.appointments[position].id;
    this.router.navigate(['editAppointments', this.id]);
  }

  public deleteItem(position: number) {
    this.mostrarModal();
    this.id = this.appointments[position].id;
  }

  public mostrarModal() {
    if (this.isModal == false) {
      this.isModal = true;
    } else {
      this.isModal = false;
    }
  }

  public closeModal(data: any) {
    this.isModal = data;
  }
}
