import { Injectable } from '@angular/core';
import { IOrderPurchases } from 'src/app/models/purchases';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  private purchasesStorage: IOrderPurchases[];

  constructor() { }

    // запись данных в this.ticketStorage
  setStorage(data: IOrderPurchases[]): void {
    this.purchasesStorage = data;
  }

  // возвращает в this.ticketStorage
  getStorage(): IOrderPurchases[] {
    return this.purchasesStorage;
  }
  
}
