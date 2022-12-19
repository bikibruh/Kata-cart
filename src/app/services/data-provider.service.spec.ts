import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {DataProviderService} from "./data-provider.service";
import {Item} from "../models/item.model";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

let item: Item;

describe('dataProviderService', () => {
  let dataProviderService: DataProviderService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [DataProviderService,
        {provide: HttpClient, useValue: httpClientSpy}
      ],
    });
    item = {
      id: "1",
      name: "string",
      price: 1,
      isImported: true,
      category: 'string',
      quantity: 10
    };
    httpClientSpy.get.and.returnValue(of([item]));
    dataProviderService = new DataProviderService(httpClientSpy);
  });
  it('should add new items to cart', () => {
    dataProviderService.addItemToCart(item);
    expect(dataProviderService.cartItems.length).toBe(1);
    expect(dataProviderService.cartItems[0].quantity).toBe(1);
    expect(dataProviderService.items[0].quantity).toBe(9);
  });
  it('should increase items in cart', fakeAsync(() => {
    dataProviderService.addItemToCart(item);
    dataProviderService.addItemToCart(item);
    tick();
    expect(dataProviderService.cartItems.length).toBe(1);
    expect(dataProviderService.cartItems[0].quantity).toBe(2);
    expect(dataProviderService.items[0].quantity).toBe(8);
  }));
  it('should decrease items in cart', fakeAsync(() => {
    dataProviderService.addItemToCart(item);
    tick();
    dataProviderService.addItemToCart(item);
    tick();
    dataProviderService.addItemToCart(item);
    tick();
    dataProviderService.addItemToCart(item);
    tick();
    dataProviderService.deleteItemFromCart(item);
    expect(dataProviderService.cartItems.length).toBe(1);
    expect(dataProviderService.cartItems[0].quantity).toBe(3);
    expect(dataProviderService.items[0].quantity).toBe(7);
  }));

  it('should remove items in cart', fakeAsync(() => {
    dataProviderService.addItemToCart(item);
    tick();
    dataProviderService.removeItemFromCart(item);
    tick();
    expect(dataProviderService.cartItems.length).toBe(0);
  }));
});
