import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {IProduct, IProductTypeSelect} from "../../models/product";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../services/products/products.service";
import {ProductsStorageService} from "../../services/products-storage/products-storage.service";
import {faHeart} from "@fortawesome/free-regular-svg-icons/faHeart";
import {BasketService} from "../../services/basket/basket.service";
import {UserService} from "../../services/user/user.service";
import {IBasket} from "../../models/basket";
import { MessageService } from 'primeng/api';
import { IconDefinition, faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { Subject, Subscription, fromEvent } from 'rxjs';

// interface PageEvent {
//   first?: number;
//   rows?: number;
//   page?: number;
//   pageCount?: number;
// }

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit, OnDestroy, AfterViewInit {
  products: IProduct[];
  productsCopy: IProduct[];
  productsCopy2: IProduct[];
  favoritesIcon = faHeart;
  removeIcon: IconDefinition = faRectangleXmark;
  basket: IBasket[] = [];
  selectedType: IProductTypeSelect;
  login: string | null;
  adminLogIn: boolean  = false;
  // productsArrayLength: number;

  // количество элементов с 0 до 10
  // first: number = 0;
  // rows: number = 9;
  // page: number = 0;
  // pageCount: number = 0;

  // private pageSubscription: Subscription;
  // private pageUnsubscription: Subscription;
  // private pageSubject = new Subject<number>();
  // readonly changePage$ = this.pageSubject.asObservable();

  private productsUnsubscriber: Subscription;

  @ViewChild('productWrap') productWrap: ElementRef<any>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productsService: ProductsService,
              private productsStorage: ProductsStorageService,
              private basketService: BasketService,
              private messageService: MessageService,
              private userService: UserService) {
  }

  ngOnInit() {
    //получение каталога товаров
    this.getPageProducts();
    //получаем данные корзины
    this.basket = this.basketService.getBasketToStore();
    //проверка на админа
    this.initAdmin();

    // Фильтрация
    this.productsUnsubscriber = this.productsService.productType$.subscribe((data: IProductTypeSelect) => {
      let productsType: string;
      switch (data.value) {
        case "":
          this.productsService.getProducts().subscribe(
            (data) => {
              this.products = data;
              this.productsStorage.setStorage(data);
            }
          );
          break;
          case "makeup":
            this.productsService.getProductsByType('makeup').subscribe(
              (data) => {
                this.products = data;
                this.productsStorage.setStorage(data);
              }
            );
            break;
            case "care":
            this.productsService.getProductsByType('care').subscribe(
              (data) => {
                this.products = data;
                this.productsStorage.setStorage(data);
              }
            );
            break;
            case "hair":
            this.productsService.getProductsByType('hair').subscribe(
              (data) => {
                this.products = data;
                this.productsStorage.setStorage(data);
              }
            );
            break;
            case "perfumery":
            this.productsService.getProductsByType('perfumery').subscribe(
              (data) => {
                this.products = data;
                this.productsStorage.setStorage(data);
              }
            );
            break;
      }
    }); 

    // this.pageUnsubscription = this.changePage$.subscribe((data: number) => {
    //   let page: number;
    //   switch (data) {
    //     case data:
    //       console.log(data);
    //       let i = data * 10;
    //       let j = 10 + i;
    //       this.productsCopy2 = this.productsCopy;
    //       this.products = this.productsCopy2.map((item, index, array) => {
    //         if ((index >= i) || (index < j)) {
    //           return item;
    //         } else { 
    //           return array[1]; 
    //         }
    //       });
    //       console.log('slice', i, j);
    //       break;
    //   }
    // });
    
  }

  getPageProducts() {
    //подписка на данные, которые вернет Observable; data - результат
  this.productsService.getProducts().subscribe(
    (data) => {
      this.products = data;
      this.productsCopy = [...this.products];
      this.productsCopy2 = [...this.products];
      // this.productsArrayLength = data.length;
      // console.log('products[] ', this.products)
      this.productsStorage.setStorage(data);
    }
  )
  }

  ngAfterViewInit(): void {
    
  }

  ngOnDestroy(): void {
    this.productsUnsubscriber.unsubscribe();
  }

  // Проверка, является ли пользователь админом
  initAdmin(): void {
    this.login = this.userService.getLogin();
    if (this.login === "admin") {
      this.adminLogIn = true;
    }
  }

  // переход на страницу продукта
  goToProductInfoPage(item: IProduct) {
    this.router.navigate([`product-item/${item._id}`], {relativeTo: this.route}).then(nav => {
    }, err => {console.log('goToProductInfoPage ', err)});
  }

  //пагинация
  // onPageChange(event: PageEvent) {
  //   this.pageSubject.next(this.page);
  //   if (event.first) {
  //     this.first = event.first;
  //   } else {
  //     this.first = 0;
  //   }
  //   if (event.rows) {
  //     this.rows = event.rows;
  //   }
  //   if (event.page) {
  //     this.page = event.page;
  //   } else {
  //     this.page = 0;
  //   }
  //   if (event.pageCount) {
  //     this.pageCount = event.pageCount;
  //   }

    // console.log(this.first, this.rows, this.page, this.pageCount);
    // console.log(event);
  // }

  //Удаление товара (админка)
  deleteProduct(item: IProduct) {
    this.productsService.deleteProduct(item._id);
    this.messageService.add({severity:'error', summary:"Товар был удалён"});
  }

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
