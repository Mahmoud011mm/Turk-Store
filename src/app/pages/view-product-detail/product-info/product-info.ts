import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../models/product';
import { TitleCasePipe } from '@angular/common';
import { StockStatus } from '../stock-status/stock-status';
import { QtySelector } from '../../../components/qty-selector/qty-selector';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ToggleWishlistButton } from '../../../components/toggle-wishlist-button/toggle-wishlist-button';
import { EcommerceStor } from '../../../ecommerce-store';
import { StarRating } from "../../../components/star-rating/star-rating";

@Component({
  selector: 'app-product-info',
  imports: [
    TitleCasePipe,
    StockStatus,
    QtySelector,
    MatAnchor,
    MatIcon,
    ToggleWishlistButton,
    MatIconButton,
    StarRating
],
  templateUrl: './product-info.html',
  styleUrl: './product-info.css',
})
export class ProductInfo {
  store = inject(EcommerceStor);

  product = input.required<Product>();
  quantity = signal(1);
}
