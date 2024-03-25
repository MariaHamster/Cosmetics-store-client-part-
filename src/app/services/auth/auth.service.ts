import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersStorage: IUser[] = [];

  constructor() { }

  //проверка, повторяется ли уже зарегистрированный логин
  isUserExists(user: IUser): boolean {
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);
    return !!isUserExists;
  }
}
