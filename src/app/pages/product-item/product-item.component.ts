import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../models/product";
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products/products.service";
import {IBasket} from "../../models/basket";
import {BasketService} from "../../services/basket/basket.service";
import {faHeart} from "@fortawesome/free-regular-svg-icons/faHeart";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit{
  product: IProduct;
  basket: IBasket[] = [];
  // favoritesIcon = faHeart;

  constructor(private route: ActivatedRoute,
              private productService: ProductsService,
              private basketService: BasketService,
              private messageService: MessageService) {  }


  ngOnInit() {
    const routeIdParam = this.route.snapshot.paramMap.get('_id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('_id');
    const paramValueId = routeIdParam || queryIdParam;
    console.log('param', paramValueId);

    if (paramValueId) {
      this.productService.getProductById(paramValueId).subscribe((data) => {
        this.product = data[0];
      });
    }

    //получаем данные корзины
    this.basket = this.basketService.getBasketToStore();
  }

  // Добавление продукта в избранное
  // addProductInFavorites() {

  // }

  // Добавление продукта в корзину
  addProductToBasket(item: IProduct) {
    // let product = {'id': item._id, 'quantity': 1};
    let product = {'id': item._id, 'price': item.price, 'quantity': 1};

    let productInBasket = this.basket.find(item => item.id == product.id);
    if (productInBasket) {
      this.basket.forEach((item) => {
        if (item.id == product.id) {
          item.quantity = item.quantity + 1;
        }
      })
    } else {
      this.basket.push(product);
    }

    this.basketService.setBasketToStore(this.basket);
    this.messageService.add({severity:'success', summary:"Товар добавлен в корзину"});
  }

}
