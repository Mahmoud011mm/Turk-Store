import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ViewPanel } from '../../directives/view-panel';

@Component({
  selector: 'app-order-success',
  imports: [MatButton, RouterLink, MatIcon],
  templateUrl: './order-success.html',
  styleUrl: './order-success.css',
})
export default class OrderSuccess {}
