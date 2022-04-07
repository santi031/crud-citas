import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards/cards.component';
import { TablesComponent } from './tables/tables.component';
import { FormsComponent } from './forms/forms.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CardsComponent,
    TablesComponent,
    FormsComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ColorPickerModule,
    RouterModule,
    FormsModule,
  ],
  exports:[
    CardsComponent,
    TablesComponent,
    ModalComponent
  ]
})
export class ComponentsModule { }
