import { Component } from '@angular/core';
import {faTiktok, faVk} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  vkIcon = faVk;
  tiktokIcon = faTiktok;

  constructor() {
  }

}
