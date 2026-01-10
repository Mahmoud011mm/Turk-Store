import { Component, input } from '@angular/core';
import { UserReview } from '../../../models/user-review';
import { StarRating } from "../../../components/star-rating/star-rating";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-review-items',
  imports: [StarRating, DatePipe],
  templateUrl: './view-review-items.html',
  styleUrl: './view-review-items.css',
})
export class ViewReviewItems {
  review = input.required<UserReview>()
}
