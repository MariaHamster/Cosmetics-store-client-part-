import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasesComponent } from './purchases.component';
import {PurchasesRoutingModule} from "./purshases-routing.module";
import { CarouselModule } from 'primeng/carousel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    PurchasesComponent
  ],
  imports: [
    CommonModule,
    PurchasesRoutingModule,
    CarouselModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class PurchasesModule { }
