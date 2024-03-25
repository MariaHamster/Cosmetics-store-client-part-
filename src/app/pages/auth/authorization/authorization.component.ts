import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {IUser} from "../../../models/users";
import {UserService} from "../../../services/user/user.service";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {
  psw: string;
  login: string;
  loginText = 'Логин';
  pswText = 'Пароль';


  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private http: HttpClient,
              private messageService: MessageService) {
  }

  onAuth(ev: Event): void {
    const authUser: IUser = {
      psw: this.psw,
      login: this.login,
    }

    this.http.post<{access_token: string, id: string}>('http://localhost:3000/users/'+authUser.login, authUser).subscribe((data) => {
      authUser.id = data.id;
      this.userService.setUser(authUser);
      const token: string = data.access_token;
      this.userService.setToken(token);
      this.userService.setToStore(token);
      this.userService.setIdToStore(authUser.id);
      this.userService.setLoginToStore(authUser.login);

      this.userService.userIsAuth(true);

      this.router.navigate(['/home']);

    }, (err: HttpErrorResponse)=> {
      this.messageService.add({severity:'error', summary:"Логин или пароль введены не верно"});
    });
  }
}
