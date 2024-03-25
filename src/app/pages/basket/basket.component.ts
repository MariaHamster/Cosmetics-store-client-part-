import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IBasket, IFullBasket} from "../../models/basket";
import {BasketService} from "../../services/basket/basket.service";
import {UserService} from "../../services/user/user.service";
import {ProductsService} from "../../services/products/products.service";
import {IProduct} from "../../models/product";
import {ActivatedRoute, Router} from "@angular/router";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {faRectangleXmark} from "@fortawesome/free-regular-svg-icons/faRectangleXmark";
import {OrderRestService} from "../../services/rest/order-rest/order-rest.service";
import {IOrder} from "../../models/order";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket: IBasket[];
  fullBasket: IFullBasket[];
  totalPrice: number[];
  totalPriceValue: number;
  removeIcon: IconDefinition = faRectangleXmark;
  additionalInfo: string;
  visible: boolean = false;


  @ViewChild('basketWrap') basketWrap: ElementRef<any>;

  constructor(private basketService: BasketService,
              private userService: UserService,
              private productsService: ProductsService,
              private router: Router,
              private route: ActivatedRoute,
              private orderService: OrderRestService,
              private messageService: MessageService) {  }

  ngOnInit() {
    this.initBasket();
    }

  //получаем продукты из корзины
    initBasket() {
      this.basket = this.basketService.getBasketToStore();
      this.fullBasket = [];
      this.totalPrice = [];
      this.totalPriceValue = 0;

      this.basket.forEach((item, index) => {
        this.productsService.getProductById(item.id).subscribe(
          (data) => {
            let products = Object.assign(data[0], item);
            this.fullBasket[index] = products;
            //для подсчёта стоимости
            // let price = Number(products.price);
            // let quantity = products.quantity;
            // let sum = price * quantity;
            // this.totalPrice.push(sum);
            // this.initTotalPrice(this.totalPrice, index);
          });
      });

      this.initTotalPrice();
    }

  //переход на страницу продукта
  goToProductInfoPage(item: IProduct) {
    this.router.navigate([`/home/catalogue/product-item/${item._id}`], {relativeTo: this.route}).then(nav => {
    }, err => {console.log('goToProductInfoPage ', err)});
  }

  // модальное окно
  showDialog() {
    const userId = this.userService.getUserId();
      if (userId == null) {
      } else {
        this.visible = true;
      }
  }

  //проверяем количество продуктов в корзине (50)
  // checkBasket(basket: IBasket): number {
  //   return basket.((sum,item) => {
  //       return sum + item.quantity
  //     }, 1);
  // }

  //фиксируем изменение количества продуктов
  changeQuantity(ev: IFullBasket) {
    // const FullBasket = this.checkBasket();
    // if (FullBasket<51) {
      let changeProduct = {'id': ev._id, 'quantity': ev.quantity};
    this.basket.forEach((item,index) => {
      if (item.id == changeProduct.id) {
        item.quantity = changeProduct.quantity;
      }
    })
    this.basketService.setBasketToStore(this.basket);
    //обновляем данные корзины
    this.initBasket();
    // console.log(FullBasket);
    // } else {
      // this.messageService.add({severity:'warn', summary:'В корзину нельзя добавить более 50 товаров за один заказ'});
      // console.log(FullBasket);
    // }
  }

  //удаляем продукт из корзины
  removeProductItem(item: IProduct): void {
    let product = {'id': item._id};
    this.basket.forEach((item,index) => {
      if (item.id == product.id) {
        this.basket.splice(index, 1);
      }
    })
    this.basketService.setBasketToStore(this.basket);
    //обновляем данные корзины
    this.initBasket();
  }

  //формируем общую стоимость
  // initTotalPrice(item: number[], index: number): void {
  //   this.totalPriceValue = this.totalPriceValue + item[index];
  // }
  initTotalPrice(): void {
    this.totalPriceValue = this.basket.map((item) => {
      return (Number(item.price) * item.quantity);
    }).reduce((sum, price) => {
      return sum + price;
    }, 0);
  }

  addOrder() {
    //проверяем, пуста ли корзина
    if (this.basket.length == 0) {
      //пишем тоаст о том, что корзина пуста
      this.messageService.add({severity:'error', summary:'Корзина пуста'});
    } else {
      const userId = this.userService.getUserId();
      if (userId == null) {
        //пишем тоаст о том, что необходимо авторизоваться
        this.messageService.add({severity:'error', summary:'Для оформления заказа необходимо пройти авторизацию'});
      } else {
        //формируем то, что отправляем на сервер
        const orderObj: IOrder = {
        products: this.basket,
        totalPriceValue: this.totalPriceValue,
        // userId: this.userService.getUser()?.id,
        userId: this.userService.getUserId() || undefined,
        };
        //отправка на сервер
        this.orderService.createOrder(orderObj).subscribe((data) => {});
        //очищаем корзину
        this.basket = [];
        this.basketService.setBasketToStore(this.basket);
        this.fullBasket = [];
        this.totalPrice = [];
        this.totalPriceValue = 0;
        //пишем тоаст о том, что заказ успешно отправлен
        this.messageService.add({severity:'success', summary:'Заказ успешно завершён'});
      }
    }
  }

}
