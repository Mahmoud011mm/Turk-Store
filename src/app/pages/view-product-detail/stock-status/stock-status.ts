import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-stock-status',
  imports: [MatIcon],
  templateUrl: './stock-status.html',
  styleUrl: './stock-status.css',
  host: {
    class: 'block',
  },
})
export class StockStatus {
  inStock = input(false);
}
