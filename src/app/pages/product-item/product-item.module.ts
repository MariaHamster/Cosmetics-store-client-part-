import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item.component';
import {ProductItemRoutingModule} from "./product-item-routing.module";
import {TabViewModule} from "primeng/tabview";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    ProductItemRoutingModule,
    TabViewModule,
    FontAwesomeModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class ProductItemModule { }
