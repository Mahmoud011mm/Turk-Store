import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStor } from '../../ecommerce-store';

@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatIcon],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>()

  store = inject(EcommerceStor);
  
}
