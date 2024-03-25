import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import {AuthRoutingModule} from "./auth-routing.module";
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegistrationComponent } from './registration/registration.component';
import {TabViewModule} from "primeng/tabview";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast"
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    AuthComponent,
    AuthorizationComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TabViewModule,
    InputTextModule,
    FormsModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class AuthModule { }
