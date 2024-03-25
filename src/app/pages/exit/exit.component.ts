import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-exit',
  templateUrl: './exit.component.html',
  styleUrls: ['./exit.component.scss']
})
export class ExitComponent implements OnInit {
  constructor(private userService: UserService) {  }

  ngOnInit() {
    this.logout();
  }

  // Выход из аккаунта
  logout(): void {
    this.userService.removeId();
    this.userService.removeToken();
    this.userService.removeLogin();
  }
}
