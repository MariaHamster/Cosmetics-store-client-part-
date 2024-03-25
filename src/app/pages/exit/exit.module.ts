import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExitComponent } from './exit.component';
import {ExitRoutingModule} from "./exit-routing.module";


@NgModule({
  declarations: [
    ExitComponent
  ],
  imports: [
    CommonModule,
    ExitRoutingModule
  ]
})
export class ExitModule { }
