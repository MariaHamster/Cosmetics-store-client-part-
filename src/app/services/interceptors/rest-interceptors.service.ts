import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class RestInterceptorsService implements  HttpInterceptor {

  constructor(private UserService: UserService) { }

  // Добавление токена в заголовок
  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const hasToken = this.UserService.getToken();
    if (hasToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", hasToken)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }

}
