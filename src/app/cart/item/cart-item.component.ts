import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartItem} from "../../models/cart-item";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() cartItem: CartItem | undefined;
  @Output() increaseItemInCartEvent = new EventEmitter<CartItem>();
  @Output() reduceItemInCartEvent = new EventEmitter<CartItem>();
  @Output() removeItemInCartEvent = new EventEmitter<CartItem>();

  reduceItemInCart() {

    this.reduceItemInCartEvent.emit(this.cartItem);
  }

  removeItemFromCart() {
    this.removeItemInCartEvent.emit(this.cartItem);
  }

  increaseItemInCart() {
    this.increaseItemInCartEvent.emit(this.cartItem);
  }
}
