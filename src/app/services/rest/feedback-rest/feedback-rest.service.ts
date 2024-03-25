import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IFeedback} from "../../../models/feedback";

@Injectable({
  providedIn: 'root'
})
export class FeedbackRestService {

  constructor(private http: HttpClient) { }

  getFeedbacks(): Observable<IFeedback[]> {
    return this.http.get<IFeedback[]>('http://localhost:3000/feedback/');
  }

  getFeedbackByTheme(theme: string): Observable<IFeedback[]> {
    return this.http.get<IFeedback[]>('http://localhost:3000/feedback/' + theme);
  }

  createFeedback(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/feedback/', body, {headers: {
      }})
  }

}
