import {ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {Location} from '@angular/common';

import {CartComponent} from './cart.component';
import {By} from "@angular/platform-browser";
import {of} from "rxjs";
import {CartItem} from "../models/cart-item";
import {DataProviderService} from "../services/data-provider.service";
import {MatGridListModule} from "@angular/material/grid-list";
import {OrderByPipe} from "ngx-pipes";
import {RouterTestingModule} from "@angular/router/testing";
import {CatalogueComponent} from "../catalogue/catalogue.component";
import {CartItemComponent} from "./item/cart-item.component";
import {MatCardModule} from "@angular/material/card";
import {TaxApplierPipe} from "./pipes/tax-applier.pipe";
import {TaxAmountPipe} from "./pipes/tax-amount.pipe";
import {MatIconModule} from "@angular/material/icon";
import {Router} from "@angular/router";
import {TotalAmount} from "../models/total-amount.model";
import {TranslocoModule} from "@ngneat/transloco";

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let router: Router;
  const dataProviderStub = {

    cartItems$: of([{
      name: "string",
      price: 1,
      isImported: true,
      category: 'string',
      quantity: 10,
      canIncreaseQuantity: true
    } as CartItem])

  }
  var myLocation: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent, OrderByPipe, CartItemComponent, TaxApplierPipe, TaxAmountPipe, CatalogueComponent],
      imports: [
        MatGridListModule,
        MatCardModule,
        TranslocoModule,
        RouterTestingModule.withRoutes([
          {path: '', component: CatalogueComponent}
        ]),
        MatIconModule],
      providers: [
        {provide: DataProviderService, useValue: dataProviderStub},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });
  beforeEach(inject([Location], (location: Location) => {
    myLocation = location;
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a panier vide label when empty ', () => {
    component.cartItems$ = of([]);
    fixture.detectChanges();
    const panier_vide = fixture.debugElement.nativeElement.querySelector('#panier-vide');
    expect(panier_vide.innerHTML).toContain('vide 🕵🏻');

  });
  it('should have an acceuil button', () => {
    let button = fixture.debugElement.query(By.css('button'))
    expect(button.nativeElement.textContent).toContain('Acceuil');
  });
  it(`should navigate to acceil when clicking on button acceuil`, fakeAsync(() => {
    let button = fixture.debugElement.nativeElement.querySelector('#acceuil-button');
    button.click();
    tick();
    fixture.whenStable().then(() => {
      expect(myLocation.path()).toBe('/');
    });
  }));

  it(`should show total price when panier is not empty`, () => {

    component.totalPrice$ = of({
      totalHT: 100,
      taxes: 100
    } as TotalAmount);
    fixture.detectChanges();
    let total_price = fixture.debugElement.nativeElement.querySelector('#total-price');
    expect(total_price).toBeTruthy();
  });
});
