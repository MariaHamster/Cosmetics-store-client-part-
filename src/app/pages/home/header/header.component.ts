import {AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {UserService} from "../../../services/user/user.service";
import {IUser} from "../../../models/users";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {debounceTime, fromEvent, Subject, Subscription, takeUntil} from "rxjs";
import {IProduct} from "../../../models/product";
import {ProductsService} from "../../../services/products/products.service";
import {ProductsStorageService} from "../../../services/products-storage/products-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  products: IProduct[];
  productsCopy: IProduct[];
  items: MenuItem[];
  fullItems: MenuItem[];
  token: string | null;
  login: string | null;
  logoutIcon = faRightFromBracket;
  private logOut: boolean  = true;
  private logIn: boolean  = false;
  private adminLogIn: boolean  = false;
  private destroyer = new Subject();

  @ViewChild('productSearch') productSearch: ElementRef;

  searchProductSub: Subscription;
  productSearchValue: string;

  constructor(private userService: UserService,
              private productsService: ProductsService,
              private productsStorage: ProductsStorageService) {
  }

  ngOnInit(): void {

    //подписка на данные, которые вернет Observable; data - результат
    this.productsService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.productsCopy = [...this.products];
        this.productsStorage.setStorage(data);
      }
    )

    this.userService.userAuth$.pipe(takeUntil(this.destroyer)).subscribe((data) => {
      console.log('***');
      this.logOut = false;
      this.logIn = true;
      this.initUser(); 
      this.initAdmin();
      this.items = this.initMenuItems();
    
    });
    this.initUser(); 
    this.initAdmin();
    this.items = this.initMenuItems();

    //подписка на данные, которые вернет Observable; data - результат
    this.productsService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.productsCopy = [...this.products];
        this.productsStorage.setStorage(data);
      }
    )
  }

  ngOnDestroy(): void {
    this.destroyer.next(true);
    this.destroyer.complete();
    this.searchProductSub.unsubscribe();
  }

  ngOnChanges(ev: SimpleChanges): void {
    this.logIn = (typeof this.token != "undefined");
    this.logOut = !this.logIn;
    this.initAdmin();
    this.items = this.initMenuItems();
  }

  ngAfterViewInit() {
// логика по поиску
    const fromEventObserver = fromEvent(this.productSearch.nativeElement, 'keyup');
    this.searchProductSub = fromEventObserver.pipe(
      debounceTime(200)).subscribe((ev: any) => {
      if (this.productSearchValue) {
        this.products = this.productsCopy.filter((el) => {
          //el.name.includes(this.ticketSearchValue)
          const name = typeof (el?.name) === "string" ? el.name.toLowerCase(): '';
          return name.includes(this.productSearchValue.toLowerCase());
        });
      } else {
        this.products = [...this.productsCopy];
      }
      console.log('Поиск');
    });
  }

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Каталог',
        routerLink: ['catalogue']
      },
      {
        label: 'Корзина',
        routerLink: ['basket']
      },
      {
        label: 'Вход / Регистрация',
        routerLink: ['auth'],
        visible: this.logOut,
      },
      {
        label: 'Мой профиль',
        visible: this.logIn,
        items: [
          {
            label: 'Мои покупки',
            routerLink: ['purchases']
          },
          {
            label: '* Создать товар',
            routerLink: ['product-loader'],
            visible: this.adminLogIn,
          },
          {
            label: '* Посмотреть отзывы',
            routerLink: ['reviews'],
            visible: this.adminLogIn,
          },
          {
            label: 'Выход',
            routerLink: ['home'],
            command: (event: MenuItemCommandEvent) => {
              this.logout();
              this.items = this.initMenuItems();
              }
          },
        ]
      }
    ];
  }

  logout(): void {
    this.userService.removeId();
    this.userService.removeToken();
    this.userService.removeLogin();
    this.logIn = false;
    this.logOut = true;
    this.adminLogIn = false;
  }

  // Проверка, авторизован ли пользователь
  initUser(): void {
    this.token = this.userService.getToken();
    if (this.token) {
      this.logIn = true;
      this.logOut = false;
    }
  }

  // Проверка, является ли пользователь админом
  initAdmin(): void {
    this.login = this.userService.getLogin();
    if (this.login === "admin") {
      this.adminLogIn = true;
    }
  }

}
