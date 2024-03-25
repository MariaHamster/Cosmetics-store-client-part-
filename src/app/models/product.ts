export interface IProduct {
  name:string,
  description:string,
  price:string,
  type: string,
  img:string,
  _id:string,
}

export interface IProductWithCounts {
  name:string,
  description:string,
  price:string,
  type:string,
  img:string,
  _id:string,
  _customCounts:number;
}

export type ProductType = 'Все товары' | 'Макияж' | 'Уход' | 'Волосы' | 'Парфюмерия'

export interface IProductTypeSelect {
  label: string,
  value?: string,
}

