import { Component, inject, signal } from '@angular/core';
import { ViewPanel } from '../../../directives/view-panel';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OptionItem } from '../../../models/option-item';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { EcommerceStor } from '../../../ecommerce-store';
import { AddReviewParams } from '../../../models/user-review';

@Component({
  selector: 'app-write-review',
  imports: [
    ViewPanel,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './write-review.html',
  styleUrl: './write-review.css',
  host: {
    class: 'block',
  },
})
export class WriteReview {
  store = inject(EcommerceStor);

  ratingOptions = signal<OptionItem[]>([
    { label: '5 Stars - Excellent', value: 5 },
    { label: '4 Stars - Very Good', value: 4 },
    { label: '3 Stars - Good', value: 3 },
    { label: '2 Stars - Fair', value: 2 },
    { label: '1 Star - Poor', value: 1 },
  ]);

  fb = inject(NonNullableFormBuilder);

  reviewForm = this.fb.group({
    title: ['', Validators.required],
    comment: ['', Validators.required],
    rating: [5, Validators.required],
  });

  saveReview() {
    if (!this.reviewForm.valid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const {title, comment, rating} = this.reviewForm.value;
    this.store.addReview({title, comment, rating} as AddReviewParams);

  }
}
