import {CartItemComponent} from './cart-item.component';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {CatalogueComponent} from "../../catalogue/catalogue.component";
import {MatCardModule} from "@angular/material/card";
import {TaxApplierPipe} from "../pipes/tax-applier.pipe";
import {TaxAmountPipe} from "../pipes/tax-amount.pipe";
import {MatIconModule} from "@angular/material/icon";
import {TranslocoModule} from "@ngneat/transloco";

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartItemComponent, TaxApplierPipe, TaxAmountPipe],
      imports: [
        MatCardModule,
        MatIconModule,
        TranslocoModule,
        RouterTestingModule.withRoutes([{path: '', component: CatalogueComponent}])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {

    expect(component).toBeTruthy();
  });

  it('should emit reduceItemInCartEvent', async () => {
    spyOn(component.reduceItemInCartEvent, 'emit');
    component.reduceItemInCart();
    expect(component.reduceItemInCartEvent.emit).toHaveBeenCalled();
  });

  it('should emit increaseItemInCartEvent', async () => {
    spyOn(component.increaseItemInCartEvent, 'emit');
    component.increaseItemInCart();
    expect(component.increaseItemInCartEvent.emit).toHaveBeenCalled();
  });

  it('should emit removeItemFromCart', async () => {
    spyOn(component.removeItemInCartEvent, 'emit');
    component.removeItemFromCart();
    expect(component.removeItemInCartEvent.emit).toHaveBeenCalled();
  })
});
