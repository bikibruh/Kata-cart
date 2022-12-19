import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Item} from "../models/item.model";
import {TotalAmount} from "../models/total-amount.model";
import {CartItem} from "../models/cart-item";
import {TaxComputeUtils} from "../common/services/tax-compute.utils";

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  private _jsonURL = "assets/SampleJson.json";

  private _items = new BehaviorSubject<Item[]>([]);
  readonly items$: Observable<Item[]> = this._items.asObservable();

  private _cartItems = new BehaviorSubject<CartItem[]>([])
  readonly cartItems$: Observable<CartItem[]> = this._cartItems.asObservable();

  private _totalAmount = new BehaviorSubject<TotalAmount>({totalHT: 0, taxes: 0})
  readonly totalAmount$: Observable<TotalAmount> = this._totalAmount.asObservable();
  private _cartArticleCount = new BehaviorSubject<number>(0)
  readonly cartArticleCount$: Observable<number> = this._cartArticleCount.asObservable();

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<Item[]>(this._jsonURL).subscribe(items => this.items = items);
  }

  addItemToCart(item: Item) {
    let elementFound = this.items.find(this.elementEqualTo(item))
    let cartItemFound = this.cartItems.find(this.elementEqualTo(item))
    let cartItem = this.createCartItemFrom(item);
    if (elementFound) {
      elementFound.quantity--;
      if (!cartItemFound) {
        this.cartItems = [...this.cartItems, cartItem];
      } else if (cartItemFound) {
        cartItemFound.quantity++;
        cartItemFound.canIncreaseQuantity = elementFound.quantity !== 0;
        this._cartItems.next(this.cartItems);
      }
    }
    this._items.next(this.items);
    this.computeTotal();
    this._cartArticleCount.next(this.cartArticleCount.valueOf() + 1);
  }

  private elementEqualTo(item: Item) {
    return (elem: { name: any; category: any; }) => elem.name === item.name
      && elem.category === item.category;
  }

  deleteItemFromCart(item: any) {
    let cartItem = this.cartItems.find(this.elementEqualTo(item));
    let itemFound = this.items.find(this.elementEqualTo(item))
    if (!cartItem) console.error('Produit non trouvé!');
    else if (cartItem.quantity < 2) {
      this._cartItems.next(this.cartItems.filter(this.elementDifferentThan(item)))
    } else {
      cartItem.quantity -= 1;
      this._cartItems.next(this.cartItems)
    }
    if (itemFound) itemFound.quantity++;
    this._items.next(this.items)
    this.computeTotal()
    this._cartArticleCount.next(this.cartArticleCount.valueOf() - 1);
  }

  private elementDifferentThan(item: any) {
    return (elem: CartItem) => elem.name !== item.name
      || elem.category !== item.category;
  }

  removeItemFromCart(item: any) {
    let elementFound = this.items.find(elem => elem.name === item.name
      && elem.category === item.category);
    if (elementFound) elementFound.quantity += item.quantity;
    this._items.next(this.items)
    this._cartItems.next(this.cartItems.filter((elem) => elem.name !== item.name
      || elem.category !== item.category))
    this.computeTotal()
    this._cartArticleCount.next(this.cartArticleCount.valueOf() - item.quantity);
  }

  computeTotal() {
    let totalAmount = {
      totalHT: TaxComputeUtils.computeHtPriceFor(this.cartItems),
      taxes: TaxComputeUtils.computeTTCPriceFor(this.cartItems)
    } as TotalAmount;
    this._totalAmount.next(totalAmount)
  }

  set items(items: Item[]) {
    this._items.next(items);
  }

  get items(): Item[] {
    return this._items.value;
  }

  set cartItems(items: CartItem[]) {
    this._cartItems.next(items);
  }

  get cartItems(): CartItem[] {
    return this._cartItems.value;
  }

  get totalAmount() {
    return this._totalAmount.value;
  }

  set totalAmount(value: TotalAmount) {
    this._totalAmount.next(value);
  }

  get cartArticleCount() {
    return this._cartArticleCount.value;
  }

  set cartArticleCount(value: number) {
    this._cartArticleCount.next(value);
  }

  private createCartItemFrom(item: Item) {
    return {
      name: item.name,
      category: item.category,
      price: item.price,
      isImported: item.isImported,
      quantity: 1,
      canIncreaseQuantity: true
    } as CartItem;
  }
}
