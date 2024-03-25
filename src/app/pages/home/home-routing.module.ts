import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home.component";
import {MainContentComponent} from "./main-content/main-content.component";
import { CarouselModule } from 'primeng/carousel';


const routes: Routes = [
  { path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: MainContentComponent
      },
      {
        path: 'catalogue',
        loadChildren:() => import('../catalogue/catalogue.module').then(m => m.CatalogueModule)
      },
      {
        path: 'basket',
        loadChildren:() => import('../basket/basket.module').then(m => m.BasketModule)
      },
      {
        path: 'auth',
        loadChildren:() => import('../auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'purchases',
        loadChildren:() => import('../purchases/purchases.module').then(m => m.PurchasesModule)
      },
      {
        path: 'reviews',
        loadChildren:() => import('../reviews/reviews.module').then(m => m.ReviewsModule)
      },
      {
        path: 'product-loader',
        loadChildren:() => import('../product-loader/product-loader.module').then(m => m.ProductLoaderModule)
      },
      {
        path: 'exit',
        loadChildren:() => import('../exit/exit.module').then(m => m.ExitModule)
      },
      {
        path: 'feedback',
        loadChildren:() => import('../feedback/feedback.module').then(m => m.FeedbackModule)
      },
      {
        path: 'product-item/:_id',
        loadChildren:() => import('../product-item/product-item.module').then(m => m.ProductItemModule)
      }
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes), 
             CarouselModule],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
