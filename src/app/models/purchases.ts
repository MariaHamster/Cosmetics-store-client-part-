import { IOrderInfo } from "./order";
import { IProduct, IProductWithCounts } from "./product";

export interface IPurchases {
    productsInfo: IProduct[],
    orderInfo: IOrderInfo[]
}

export interface IOrderPurchases {
  products: IProductWithCounts[],
  order: IOrderInfo,
}
