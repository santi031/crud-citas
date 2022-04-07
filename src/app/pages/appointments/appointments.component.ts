import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  public id: string | null = '';
  public title: string = "Agregar cita";
  public description: string = "Por favor agregue los campos requeridos"
  constructor(private aRoute: ActivatedRoute) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.id !== null) {
      this.title = "Editar cita"
      this.description = "Puede editar los campos que necesite";
    }
  }
}
