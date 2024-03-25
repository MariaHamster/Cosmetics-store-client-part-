import {IProduct} from "./product";

// export interface IBasket {
//   id: string,
//   quantity: number,
// }

export interface IBasket {
  id: string,
  price: string,
  quantity: number,
}


export interface IFullBasket extends IProduct, IBasket {

}

// type IFullBasket = IProduct & {quantity: number};

// export interface IFullBasket extends IProduct {
//   name:string,
//   description:string,
//   price:string,
//   type: string,
//   img:string,
//   _id:string,
//   quantity: number,
// }




