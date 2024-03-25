import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import {FeedbackRoutingModule} from "./feedback-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ListboxModule} from "primeng/listbox";
import {InputTextModule} from "primeng/inputtext";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ListboxModule,
    InputTextModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class FeedbackModule { }
