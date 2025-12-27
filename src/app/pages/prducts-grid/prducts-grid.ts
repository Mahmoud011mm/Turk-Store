import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';

import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

import { CommonModule, TitleCasePipe } from '@angular/common';
import { EcommerceStor } from '../../ecommerce-store';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';

@Component({
  selector: 'app-prducts-grid',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProductCard,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    TitleCasePipe,
    ToggleWishlistButton,
  ],
  templateUrl: './prducts-grid.html',
  styleUrls: ['./prducts-grid.css'],
})
export default class PrductsGrid {
  category = input<string>('All');

  store = inject(EcommerceStor);

  categories = signal<string[]>(['all', 'electronics', 'clothing', 'accessories', 'home']);

  constructor() {
    this.store.setCategory(this.category);
  }

  trackByProductId(index: number, product: Product) {
    return product?.id ?? index;
  }
  addToCart() {}
}
