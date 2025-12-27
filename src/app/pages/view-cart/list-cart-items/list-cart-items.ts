import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPanel } from '../../../directives/view-panel';
import { EcommerceStor } from '../../../ecommerce-store';
import { ShowCartItem } from "../../show-cart-item/show-cart-item";

@Component({
  selector: 'app-list-cart-items',
  imports: [ViewPanel, ShowCartItem, CommonModule],
  templateUrl: './list-cart-items.html',
  styleUrl: './list-cart-items.css',
})
export class ListCartItems {
  store = inject(EcommerceStor);
  
  trackByProductId(_index: number, item: { product: { id: number } }) {
    return item?.product?.id;
  }
}
