import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { EcommerceStor } from '../../ecommerce-store';
import { ProductCard } from '../../components/product-card/product-card';
import { MatIcon } from '@angular/material/icon';
import { EmptyWishlist } from './empty-wishlist/empty-wishlist';
import { MatButton } from '@angular/material/button';
import { Product } from '../../models/product';

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton, ProductCard, MatIcon, MatButton, EmptyWishlist],
  templateUrl: './my-wishlist.html',
  styleUrl: './my-wishlist.css',
})
export default class MyWishlist {
  store = inject(EcommerceStor);

  isInWishlist(product: Product) {
    return !!this.store.wishlistItems().find((p) => p.id === product.id);
  }

  toggleWishlist(product: Product) {
    if (this.isInWishlist(product)) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }
}
