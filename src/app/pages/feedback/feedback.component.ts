import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FeedbackRestService} from "../../services/rest/feedback-rest/feedback-rest.service";
import {IFeedback} from "../../models/feedback";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  themes: string[];
  btnDisabled: boolean = false;

  constructor(private feedbackService: FeedbackRestService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.feedbackForm = new FormGroup({
      theme: new FormControl('', {validators: Validators.required}),
      name: new FormControl('', {validators: Validators.required}),
      mail: new FormControl('', {validators: Validators.email}),
      text: new FormControl('', {validators: Validators.required}),
    });
    this.themes = [
      'Профиль',
      'Предложение по улучшению (новые сервисы)',
      'Сбои на конкретных страницах',
      'Каталог (остатки/цены/описание товара)',
      'Технический сбой - весь сайт не работает',
      'Другое',
    ]
  }

  createFeedback(): void {
    // формируем то, что отправляем на сервер
    const feedbackObj: IFeedback = {
      theme: this.feedbackForm.controls['theme'].value,
      name: this.feedbackForm.controls['name'].value,
      mail: this.feedbackForm.controls['mail'].value,
      text: this.feedbackForm.controls['text'].value
    }
    // отправка на сервер
    if ((this.feedbackForm.controls['name'].value) & (this.feedbackForm.controls['text'].value)) {
    this.feedbackService.createFeedback(feedbackObj).subscribe((data) => {});
    this.messageService.add({severity:'success', summary:"Отзыв был успешно отправлен. Спасибо за отзыв!"});
    this.feedbackForm.reset({
      theme: '',
      name: '',
      mail: '',
      text: '',
    });
    } else {
      this.messageService.add({severity:'error', summary:"Заполните поля имя или текста"});
    }
  }

}
