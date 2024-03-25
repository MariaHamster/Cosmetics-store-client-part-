import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CatalogueComponent} from "./catalogue.component";


const routes: Routes = [
  {
    path: '',
    component: CatalogueComponent,
  },
  {
    path: 'product-item/:_id',
    loadChildren:() => import('../product-item/product-item.module').then(m => m.ProductItemModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
