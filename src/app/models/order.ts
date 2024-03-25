import {IBasket} from "./basket";

export interface IOrder {
  products: IBasket[],
  totalPriceValue: number,
  userId?: string,
}

export interface IOrderInfo {
  id: string,
  products: IBasket[],
  totalPriceValue: number,
  userId: string,
  orderNumber: number
}


