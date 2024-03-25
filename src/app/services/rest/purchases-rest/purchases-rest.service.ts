import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { IPurchases } from 'src/app/models/purchases';

@Injectable({
  providedIn: 'root'
})
export class PurchasesRestService {

  constructor(private http: HttpClient) { }

  getPurchasesById(id: string): Observable<IPurchases> {
    return this.http.get<IPurchases>('http://localhost:3000/order/'  + id);
  }

}
