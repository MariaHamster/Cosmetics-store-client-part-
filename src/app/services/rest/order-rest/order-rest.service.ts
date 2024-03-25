import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IOrder} from "../../../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderRestService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>('http://localhost:3000/order/');
  }

  createOrder(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/order/', body, {headers: {
      }})
  }
}
