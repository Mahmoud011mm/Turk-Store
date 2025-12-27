import { Component, computed, inject } from '@angular/core';
import { EcommerceStor } from '../../ecommerce-store';
import { ViewPanel } from '../../directives/view-panel';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel],
  templateUrl: './summarize-order.html',
  styleUrl: './summarize-order.css',
})
export class SummarizeOrder {
  store = inject(EcommerceStor);

  subtotal = computed(() =>
    Math.round(this.store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0))
  );

  tax = computed(() => Math.round(0.05 * this.subtotal()));

  total = computed(() => this.subtotal() - this.tax());
}
