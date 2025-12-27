import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput } from '@angular/material/input';
import { ViewPanel } from '../../../directives/view-panel';

@Component({
  selector: 'app-shipping-form',
  imports: [MatIcon, MatInput, MatFormField, ViewPanel],
  templateUrl: './shipping-form.html',
  styleUrl: './shipping-form.css',
})
export class ShippingForm {

}
