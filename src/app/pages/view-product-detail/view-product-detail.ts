import { Component, computed, inject, input } from '@angular/core';
import { EcommerceStor } from '../../ecommerce-store';
import { BackButton } from '../../components/back-button/back-button';
import { Product } from '../../models/product';
import { ProductInfo } from './product-info/product-info';

@Component({
  selector: 'app-view-product-detail',
  imports: [BackButton, ProductInfo],
  templateUrl: './view-product-detail.html',
  styleUrl: './view-product-detail.css',
})
export default class ViewProductDetail {
  product = input.required<Product>();

  productId = input.required<string>();

  store = inject(EcommerceStor);

  constructor() {
    this.store.setProductId(this.productId);
  }

  backRoute = computed(() => `/products/${this.store.category()}`);
}
