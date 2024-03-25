import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueComponent } from './catalogue.component';
import {CatalogueRoutingModule} from "./catalogue-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { AsideComponent } from './aside/aside.component';
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {DataViewModule} from "primeng/dataview";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CatalogueComponent,
    AsideComponent,
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    FontAwesomeModule,
    DropdownModule,
    FormsModule,
    PaginatorModule,
    DataViewModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class CatalogueModule { }
