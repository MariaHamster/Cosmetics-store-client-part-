import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products/products.service";
import { MessageService } from 'primeng/api';

// interface IProductType {
//   type: string,
//   value: string,
// }

@Component({
  selector: 'app-product-loader',
  templateUrl: './product-loader.component.html',
  styleUrls: ['./product-loader.component.scss']
})
export class ProductLoaderComponent implements OnInit {
  productForm: FormGroup;
  // productTypes: IProductType[];
  productTypes: string[];

  constructor(private productsService: ProductsService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl('', {validators: Validators.required}),
      description: new FormControl('', {validators: Validators.required}),
      price: new FormControl('', {validators: Validators.required}),
      type: new FormControl('', {validators: Validators.required}),
      img: new FormControl('', {validators: Validators.required}),
    });
    this.productTypes = [
      'makeup',
      'care', 
      'hair',
      'perfumery',
    ];
    // this.productTypes = [
    //   {type: 'Макияж', value: 'makeup'},
    //   {type: 'Уход', value: 'care'},
    //   {type: 'Волосы', value: 'hair'},
    //   {type: 'Парфюмерия', value: 'perfumery'},
    // ];
  }

  createProduct(): void {
    if ((this.productForm.controls['name'].value) & (this.productForm.controls['description'].value) & (this.productForm.controls['price'].value)) {
      const productDataRow = this.productForm.getRawValue();
    let formParams = new FormData();  // для отправки данных разных типов (класс JS)
    if (typeof productDataRow === 'object') {
      for (let prop in productDataRow) {
        formParams.append(prop, productDataRow[prop]);
      }
    }
    this.productsService.createProduct(formParams).subscribe((data) => {});
    this.messageService.add({severity:'success', summary:"Товар успешно загружен на сервер"});
    this.productForm.reset();
    } else {
      this.messageService.add({severity:'error', summary:"Поля содержат пустые значения"});
    }
  }

  selectFile(ev: any): void {
    if (ev.target.files.length > 0) {
      const file = ev.target.files[0];
      this.productForm.patchValue({
        img: file
      });
    }
  }

}
