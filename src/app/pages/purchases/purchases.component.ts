import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IBasket } from 'src/app/models/basket';
import { IOrder } from 'src/app/models/order';
import { IProduct } from 'src/app/models/product';
import { IOrderPurchases, IPurchases } from 'src/app/models/purchases';
import { BasketService } from 'src/app/services/basket/basket.service';
import { PurchasesService } from 'src/app/services/purchases/purchases.service';
import { PurchasesRestService } from 'src/app/services/rest/purchases-rest/purchases-rest.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {
  purchases: IPurchases;
  orderPurchases: IOrderPurchases[];
  basket: IBasket[] = [];

  // productsInfo: IProduct[];
  // orderInfo: IOrder[];

  @ViewChild('purchasesWrap') purchasesWrap: ElementRef<any>;

  constructor(private purchasesService: PurchasesRestService,
              private userService: UserService,
              private basketService: BasketService,
              private messageService: MessageService,
              private purchasesStorageService: PurchasesService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const userId = this.userService.getUserId();

    if (userId) {
    //подписка на данные, которые вернет Observable; data - результат
      this.purchasesService.getPurchasesById(userId).subscribe(
        (data) => {
          this.purchases = data;
          this.orderPurchases = this.newArrayProducts(this.purchases);
          console.log('???    productsOrder ', this.orderPurchases);
          this.purchasesStorageService.setStorage(this.orderPurchases);
        }
      )
    }
  }

  newArrayProducts(purchases: IPurchases): any[] {
    const productsMap = new Map()

    const ordersWithDetailsInfo: any[] = [];

    if (Array.isArray(purchases.productsInfo)) {
      purchases.productsInfo.forEach((el) => {
        productsMap.set(el._id, el);
      })
    }

    if (Array.isArray(purchases.orderInfo)) {

      purchases.orderInfo.forEach((el) => {
        productsMap.set(el.id, el);

        const orderObj: {order: IOrder, products: IProduct[]} = {
          order: el,
          products: []
        }

        el.products.forEach((pr) => {
          const productDetail: any = productsMap.get(pr.id);

          productDetail._customCounts = pr.quantity
          if (productDetail) {
            orderObj.products.push(productDetail)
          }
        })

        ordersWithDetailsInfo.push(orderObj)
      })
    }

    return ordersWithDetailsInfo;
  }

  // Добавление заказа в корзину
  addOrderToBasket(item: IOrderPurchases) {
    let order = item.order.products;
    this.basketService.setBasketToStore(order);
    this.messageService.add({severity:'success', summary:"Заказ добавлен в корзину"});
  } 

  // переход на страницу продукта
  goToProductInfoPage(item: IProduct) {
    this.router.navigate([`catalogue/product-item/${item._id}`], {relativeTo: this.route}).then(nav => {
    }, err => {console.log('goToProductInfoPage ', err)});
  }
  
}

