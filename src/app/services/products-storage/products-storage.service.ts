import { Injectable } from '@angular/core';
import {IProduct} from "../../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsStorageService {
  private productStorage: IProduct[] = [];

  constructor() { }

  // запись данных в this.ticketStorage
  setStorage(data: IProduct[]): void {
    this.productStorage = data;
  }

  // возвращает в this.ticketStorage
  getStorage(): IProduct[] {
    return this.productStorage;
  }
}
