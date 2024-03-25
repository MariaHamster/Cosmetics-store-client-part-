import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IProduct, IProductTypeSelect} from "../../../models/product";
import {ProductsService} from "../../../services/products/products.service";
import {DropdownChangeEvent} from "primeng/dropdown";
import {ProductsStorageService} from "../../../services/products-storage/products-storage.service";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  products: IProduct[];
  productTypes: IProductTypeSelect[] = [
    {label: 'Все товары', value: ''},
    {label: 'Макияж', value: 'makeup'},
    {label: 'Уход', value: 'care'},
    {label: 'Волосы', value: 'hair'},
    {label: 'Парфюмерия', value: 'perfumery'}
  ];

  @Output() updateMenuType: EventEmitter<IProductTypeSelect> = new EventEmitter();

  constructor(private productsService: ProductsService,
              private productsStorage: ProductsStorageService) {
  }

  ngOnInit() {
    this.products = this.productsStorage.getStorage();
    // console.log('products[] ', this.products)
  }

  changeProductType(ev: DropdownChangeEvent): void {
    this.productsService.updateProduct(ev.value);
  }

}
