import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PurchasesComponent} from "./purchases.component";


const routes: Routes = [
  {
    path: '',
    component: PurchasesComponent,
  },
  {
    path: 'catalogue/product-item/:_id',
    loadChildren:() => import('../product-item/product-item.module').then(m => m.ProductItemModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule { }
