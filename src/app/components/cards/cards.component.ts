import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() title: string = "";
  @Input() description: string = "";
  
  @Input() isForm: boolean = false;
  @Input() isTable: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public goToAppointment() {
    this.router.navigate(['/appointments']);
  }


}
