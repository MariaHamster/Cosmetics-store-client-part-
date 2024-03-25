import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductLoaderComponent } from './product-loader.component';
import {ProductLoaderRoutingModule} from "./product-loader-routing.module";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    ProductLoaderComponent
  ],
  imports: [
    CommonModule,
    ProductLoaderRoutingModule,
    InputTextModule,
    ReactiveFormsModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class ProductLoaderModule { }
