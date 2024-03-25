import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PaginatorState} from "primeng/paginator";
import {first} from "rxjs";
import {IProduct} from "../../../models/product";
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsStorageService } from 'src/app/services/products-storage/products-storage.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  first: number;
  newProducts: IProduct[];
  responsiveOptions: any[] | undefined;

  @ViewChild('newProductsWrap') newProductsWrap: ElementRef<any>;

  constructor(private productsService: ProductsService,
              private router: Router,
              private route: ActivatedRoute,
              private productsStorage: ProductsStorageService) {}

  ngOnInit() {
    this.first = 0;
    //таймер для баннеров
    setInterval(() => {
      if (this.first < 2) {
        this.first = this.first + 1;
      } else {
        this.first = 0;
      }
    }, 5000);

    //подписка на данные, которые вернет Observable; data - результат
    this.productsService.getNewProducts().subscribe(
      (data) => {
        this.newProducts = data;
        this.productsStorage.setStorage(data);
      }
    )

    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first as number;
  }

  // переход на страницу продукта
  goToProductInfoPage(newProduct: IProduct) {
    console.log('id продукта ', newProduct._id);
    this.router.navigate([`product-item/${newProduct._id}`], {relativeTo: this.route}).then(nav => {
    }, err => {console.log('goToProductInfoPage ', err)});
  }

}
