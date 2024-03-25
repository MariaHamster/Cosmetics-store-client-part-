import {Component, OnInit} from '@angular/core';
import {IUser} from "../../../models/users";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../services/auth/auth.service";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login: string;
  loginText = 'Логин';
  loginPattern = '^[a-zA-Zа-яА-Я0-9]{1}[a-zA-Zа-яА-Я0-9_-]{0,}[a-zA-Zа-яА-Я0-9]{1}$';
  // email:  string;
  psw: string;
  pswRepeat: string;
  pswText = 'Пароль';
  pswPattern = '^[^ ]{1,}$';
  pswRepeatText = 'Повтор пароля';
  pswMismatch: boolean = true;
  successfulRegistration: boolean;
  alreadyRegistered: boolean;

  constructor(private authService: AuthService,
              private http: HttpClient,
              private messageService: MessageService) {  }

  ngOnInit() {
    console.log(this.loginPattern);
  }

  registration(ev: Event): void | boolean  {
    // проверка совпадения паролей
    if (this.psw !== this.pswRepeat) {
      this.pswMismatch = false;
      this.messageService.add({severity:'error', summary:'Пароли не совпадают'});
      return false;
    }
    // формируем то, что отправляем на сервер
    const userObj: IUser = {
      psw: this.psw,
      login: this.login,
    }
    // отправка на сервер
    this.http.post<IUser>('http://localhost:3000/users/', userObj).subscribe((data) => {
      if (!this.authService.isUserExists(userObj)) {
        const objUserJsonStr = JSON.stringify(userObj);
      }
      this.messageService.add({severity:'success', summary:'Регистрация прошла успешно'});
    }, (err: HttpErrorResponse)=> {
      console.log('err', err);
      this.messageService.add({severity:'warn', summary:'Пользователь уже зарегистрирован'});
    });
  }
}
