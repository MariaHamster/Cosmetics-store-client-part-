import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {MenubarModule} from "primeng/menubar";
import { FooterComponent } from './footer/footer.component';
import { MainContentComponent } from './main-content/main-content.component';
import {InputTextModule} from "primeng/inputtext";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {DataViewModule} from "primeng/dataview";
import {PaginatorModule} from "primeng/paginator";
import {RatingModule} from "primeng/rating";
import {TagModule} from "primeng/tag";
import {CarouselModule} from "primeng/carousel";


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MainContentComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MenubarModule,
    InputTextModule,
    FontAwesomeModule,
    DataViewModule,
    PaginatorModule,
    CarouselModule
  ],
  providers: []
})
export class HomeModule { }
