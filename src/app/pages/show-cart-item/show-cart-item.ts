import { Component, computed, inject, input, Input } from '@angular/core';
import { CartItem } from '../../models/cart';
import { QtySelector } from "../../components/qty-selector/qty-selector";
import { EcommerceStor } from '../../ecommerce-store';
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";

@Component({
  selector: 'app-show-cart-item',
  imports: [QtySelector, MatIcon, MatIconButton],
  templateUrl: './show-cart-item.html',
  styleUrl: './show-cart-item.css',
})
export class ShowCartItem {
  item = input.required<CartItem>();
  store = inject(EcommerceStor);

  total = computed(() => (this.item().product.price * this.item().quantity).toFixed(2));
}
