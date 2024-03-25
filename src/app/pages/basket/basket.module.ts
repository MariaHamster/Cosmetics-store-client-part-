import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BasketRoutingModule} from "./basket-routing.module";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import {DialogModule} from "primeng/dialog"


@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    BasketRoutingModule,
    InputNumberModule,
    ToastModule,
    ButtonModule,
    DialogModule,
  ],
  providers: [MessageService]
})
export class BasketModule { }
