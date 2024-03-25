import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExitComponent} from "./exit.component";


const routes: Routes = [
  {
    path: '',
    component: ExitComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExitRoutingModule { }
