import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../models/product';
import { ViewPanel } from "../../../directives/view-panel";
import { RatingSummary } from "../rating-summary/rating-summary";
import { ViewReviewItems } from "../view-review-items/view-review-items";
import { MatAnchor, MatButton } from "@angular/material/button";
import { WriteReview } from "../write-review/write-review";
import { EcommerceStor } from '../../../ecommerce-store';

@Component({
  selector: 'app-view-reviews',
  imports: [ViewPanel, RatingSummary, ViewReviewItems, MatAnchor, MatButton, WriteReview],
  templateUrl: './view-reviews.html',
  styleUrl: './view-reviews.css',
})
export class ViewReviews {

  product = input.required<Product>();

  store = inject(EcommerceStor);

  sortedReviews = computed (() => {
    return [...this.product().reviews].sort((a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime());
  })

}
