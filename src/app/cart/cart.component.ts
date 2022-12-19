import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {TotalAmount} from "../models/total-amount.model";
import {CartItem} from "../models/cart-item";
import {DataProviderService} from "../services/data-provider.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  totalPrice$: Observable<TotalAmount>;
  cartItems$: Observable<CartItem[]>;

  constructor(private dataProvider: DataProviderService) {
    this.cartItems$ = this.dataProvider.cartItems$;
    this.totalPrice$ = this.dataProvider.totalAmount$;
  }

  reduceItem(item: any) {
    this.dataProvider.deleteItemFromCart(item);
  }

  removeItem(item: any) {
    this.dataProvider.removeItemFromCart(item);
  }

  increaseItem(item: any) {
    this.dataProvider.addItemToCart(item);
  }
}
