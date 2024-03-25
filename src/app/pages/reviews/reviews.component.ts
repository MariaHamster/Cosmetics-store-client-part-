import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FeedbackRestService} from "../../services/rest/feedback-rest/feedback-rest.service";
import {IFeedback} from "../../models/feedback";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviews: IFeedback[];

  @ViewChild('reviewWrap') reviewWrap: ElementRef<any>;

  constructor(private feedbackService: FeedbackRestService) {
  }

  ngOnInit() {
    //подписка на данные, которые вернет Observable; data - результат
    this.feedbackService.getFeedbacks().subscribe(
      (data) => {
        this.reviews = data;
      }
    )
  }

}
