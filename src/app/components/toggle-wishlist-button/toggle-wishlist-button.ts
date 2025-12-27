import { Component, computed, inject, input, signal } from '@angular/core';
import { EcommerceStor } from '../../ecommerce-store';
import { Product } from '../../models/product';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIcon, MatIconButton],
  templateUrl: './toggle-wishlist-button.html',
  styleUrl: './toggle-wishlist-button.css',
})
export class ToggleWishlistButton {
  product = input.required<Product>();

  store = inject(EcommerceStor);

  isInWishlist = computed(() => this.store.wishlistItems().find((p) => p.id === this.product().id));

  toggleWishlist(product: Product) {
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }
}
