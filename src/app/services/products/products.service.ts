import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subject} from "rxjs";
import {ProductsRestService} from "../rest/products-rest/products-rest.service";
import {IProduct, IProductTypeSelect} from "../../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // для фильтрации в каталоге
  private productSubject = new Subject<IProductTypeSelect>();
  readonly productType$ = this.productSubject.asObservable();

  private productUpdateSubject = new Subject<IProduct[]>();
  readonly productUpdateSubject$ = this.productUpdateSubject.asObservable();

  constructor(private productServiceRest: ProductsRestService) {  }


  // для фильтрации в каталоге
  updateProduct(type: IProductTypeSelect): void {
    this.productSubject.next(type);
  }

  // getProducts(): Observable<IProduct[]> {
  //   const page = 3;
  //   console.log(); 
  //   return this.productServiceRest.getProducts().pipe(map(
  //     (value) => {
  //       value.map((value2, index2) => {
  //         if ((index2 <= page*9) && (index2 > (page-1)*9)) {
  //           console.log('index2 ', index2);
  //         }
  //       })
  //       return value;
  //     }
  //   ));
  // }
  getProducts(): Observable<IProduct[]> {
    return this.productServiceRest.getProducts().pipe(map(
      (value) => {
        return value;
      }
    ));
  }

  getNewProducts(): Observable<IProduct[]> {
    return this.productServiceRest.getNewProducts().pipe(map(
      (value) => {
        return value;
      }
    ));
  }

  getProductsByType(type: string): Observable<IProduct[]> {
    if (type == '') {
      return this.getProducts();
    } else {
      return this.productServiceRest.getProductsByType(type);
    }
  }

  getProductById(id: string): Observable<IProduct[]> {
    return this.productServiceRest.getProductById(id);
  }

  // sendTourData(data: any): Observable<any> {
  //   return this.productServiceRest.sendTourData(data);
  // }
  //
  // updateTicketList(data: ITour[]) {
  //   this.ticketUpdateSubject.next(data);
  // }

  createProduct(body: any) {
    return this.productServiceRest.createProduct(body);
  }

  deleteProduct(id: string) {
    return this.productServiceRest.deleteProduct(id);
  }

}
