import { Component, inject } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { MatIcon } from "@angular/material/icon";
import { EcommerceStor } from '../../../ecommerce-store';
import {  MatButton } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-tease-wishlist',
  imports: [ViewPanel, MatIcon,  RouterLink,MatButton ],
  templateUrl: './tease-wishlist.html',
  styleUrl: './tease-wishlist.css',
})
export class TeaseWishlist {
  store = inject(EcommerceStor)
}
