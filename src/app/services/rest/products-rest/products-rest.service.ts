import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProduct} from "../../../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsRestService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:3000/products/');
  }

  getNewProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:3000/product-item/');
  }

  getProductsByType(type: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:3000/products/' + type);
  }

  getProductById(id: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:3000/product-item/' + id);
  }

  createProduct(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/product-item/', body, {headers: {
      }})
  }

  deleteProduct(id: string): void {
    // return this.http.delete('http://localhost:3000/product-item/' + id);
    fetch('http://localhost:3000/product-item/' + id, {method: 'DELETE'}).then(() => {});
  }

}
