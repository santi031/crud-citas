import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointmentManagementService } from 'src/app/services/appointment-management.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output() $closeModal = new EventEmitter<boolean>();
  @Output() $isDelete = new EventEmitter<boolean>();
  @Input() id: number = 0;
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() isWarning: boolean = false;
  
  constructor(
    private serviceManagment: AppointmentManagementService
  ) { }

  
  ngOnInit(): void {
  }

  public closeModal() {
    this.$closeModal.emit(false);
  }
  
  public delete() {
    this.serviceManagment.deleteAppointment(this.id);
    this.$isDelete.emit(true);
    this.closeModal();
  }

}
