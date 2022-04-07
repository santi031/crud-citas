import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAppointment } from 'src/app/interfaces/iAppointment';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentManagementService } from 'src/app/services/appointment-management.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  public listAppointments: any[] = [];
  public appointments: any[] = [];

  public options: string[] = ['No', 'Si'];
  public color = '#ffffff';

  public appointmentsForms: IAppointment[] = [];
  public selectedAppointment = new Appointment();

  public optionSelected: string = '';
  public verSelected: string = '';

  public id: string | null = '';
  public editAppointment: any;

  public isModal: boolean = false;

  constructor(
    private serviceManagment: AppointmentManagementService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
    if (this.id === null) {
      this.initData();
    } else {
      this.initEditData();
    }
  }

  ngOnInit(): void {}

  private initData() {
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
          if (this.appointments[i].active === true) {
            this.appointments[i].active = 'Si';
          } else {
            this.appointments[i].active = 'No';
          }
        }
      });
  }

  private initEditData() {
    if (this.id !== null) {
      this.serviceManagment
        .editDoc(this.id)
        .then((data) => {
          this.editAppointment = data?.data();
        })
        .finally(() => {
          this.selectedAppointment = this.editAppointment;
          this.color = this.selectedAppointment.color;
          
          console.log(this.color);
          
          if (this.selectedAppointment.active == true) {
            this.optionSelected = 'Si';
          } else {
            this.optionSelected = 'No';
          }
        });
    }
  }

  public insertAppointment() {
    if (this.id === null) {
      this.addAppointment();
    } else {
      this.editAppointments();
    }
  }

  private addAppointment() {
    if (
      this.selectedAppointment.name == '' ||
      this.selectedAppointment.duration == 0
    ) {
      this.isModal = true;
    } else {
      this.selectedAppointment.id = this.appointments.length + 1;
      this.selectedAppointment.color = this.color;
      this.serviceManagment.addAppointment(this.selectedAppointment);
    }
  }

  private editAppointments() {
    this.selectedAppointment.color = this.color;
    this.selectedAppointment.updateDate = new Date(); 
    this.serviceManagment.addAppointment(this.selectedAppointment);
    this.editAppointment = "";
  }

  public catchValue() {
    this.verSelected = this.optionSelected;
    if (this.verSelected == 'Si') {
      this.selectedAppointment.active = true;
    } else {
      this.selectedAppointment.active = false;
    }
  }

  public backToHome() {
    this.router.navigate(['']);
  }

  public closeModal(data: any) {
    this.isModal = data;
  }
}
