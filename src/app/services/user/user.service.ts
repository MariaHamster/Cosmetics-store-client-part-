import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser | null;
  private  token: string | null;
  private userAuth: Subject<boolean> = new Subject<boolean>();
  readonly userAuth$ = this.userAuth.asObservable();

  constructor() { }

  // возвращается user
  getUser(): IUser | null{
    return this.user;
  };
  // записывается пользователь в this.user
  setUser(user: IUser) {
    this.user = user;
  };
  //устанавливаем токен в userService
  setToken(token: string): void {
    this.token = token;
  } 
  //устанавливаем токен в localStorage
  setToStore(token: string): void  {
    window.localStorage.setItem('userToken', token);
  }
  //устанавливаем id в localStorage
  setIdToStore(id: string): void {
    window.localStorage.setItem('userId', id);
  }
  //устанавливаем логин в localStorage
  setLoginToStore(login: string): void  {
    window.localStorage.setItem('userLogin', login);
  }
  // возвращаем токен
  getToken(): string | null {
    return this.token || window.localStorage.getItem('userToken');
  }
  userIsAuth(user: boolean): void {
    this.userAuth.next(user)
  }
  // возвращаем логин
  getLogin(): string | null {
    return window.localStorage.getItem('userLogin');
  }
  // возвращаем id
  getUserId(): string | null {
    return window.localStorage.getItem('userId');
  }
  // удаляем токен из localStorage
  removeToken(): void {
    this.token = null;
    window.localStorage.removeItem('userToken');
  }
  // удаляем id из localStorage
  removeId(): void {
    window.localStorage.removeItem('userId');
  }
  // удаляем логин из localStorage
  removeLogin(): void  {
    window.localStorage.removeItem('userLogin');
  }

}
