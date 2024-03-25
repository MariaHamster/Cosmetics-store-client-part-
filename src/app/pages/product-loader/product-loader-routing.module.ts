import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductLoaderComponent} from "./product-loader.component";


const routes: Routes = [
  {
    path: '',
    component: ProductLoaderComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductLoaderRoutingModule { }
