import { Injectable } from '@angular/core';
import {IBasket} from "../../models/basket";
import {IProduct} from "../../models/product";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basket: IBasket[] = [];

  constructor() { }

  //устанавливаем корзину в localStorage
  setBasketToStore(basket: IBasket[]): void  {
    this.basket = basket;
    window.localStorage.setItem('productItem', JSON.stringify(basket));
  }

  // получаем корзину из localStorage
  getBasketToStore(): IBasket[] {
    return JSON.parse(window.localStorage.getItem('productItem') || '[]');
  }


}
