import {ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';

import {CatalogueComponent} from './catalogue.component';
import {Router} from "@angular/router";
import {DataProviderService} from "../services/data-provider.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Type} from "@angular/core";
import {MatGridListModule} from "@angular/material/grid-list";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";
import {Item} from "../models/item.model";
import {CartComponent} from "../cart/cart.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {UniqueCategoryPipe} from "./pipes/unique-category.pipe";
import {FilterPipe} from "./pipes/filter.pipe";
import {CatalogueItemComponent} from "./item/catalogue-item.component";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Location} from "@angular/common";
import {TranslocoModule} from "@ngneat/transloco";
import {FlexLayoutModule} from "@angular/flex-layout";


describe('CatalogueComponent', () => {
  let component: CatalogueComponent;
  let fixture: ComponentFixture<CatalogueComponent>;
  let httpMock: HttpTestingController;
  var myLocation: Location;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogueComponent, UniqueCategoryPipe, FilterPipe, CatalogueItemComponent],
      imports: [HttpClientTestingModule,
        MatToolbarModule,
        MatGridListModule,
        MatFormFieldModule,
        TranslocoModule,
        FlexLayoutModule,
        FormsModule,
        BrowserAnimationsModule,
        MatSelectModule,
        RouterTestingModule.withRoutes([
          {path: 'panier', component: CartComponent}
        ])],
      providers: [
        {provide: DataProviderService, useValue: dataProviderStub},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogueComponent);
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);

    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);

  });
  beforeEach(inject([Location], (location: Location) => {
    myLocation = location;
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should redirect to panier when we click on panier vide', fakeAsync(() => {
    component.cartArticleCount$ = of(0);
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('#panier-vide');
    button.click();
    tick();
    fixture.whenStable().then(() => {
      expect(myLocation.path()).toBe('/panier');
    });
  }));
  it('should redirect to panier when we click on panier', fakeAsync(() => {
    component.cartArticleCount$ = of(2);
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('#panier');
    button.click();
    tick();
    fixture.whenStable().then(() => {
      expect(myLocation.path()).toBe('/panier');
    });
  }));
  it('should show panier-vide button when we havent selected articles', () => {
    component.cartArticleCount$ = of(0);
    let button = fixture.debugElement.nativeElement.querySelector('#panier-vide');
    expect(button).toBeTruthy();
  });
  it('should show panier button when we have selected articles', () => {
    component.cartArticleCount$ = of(2);
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('#panier');
    expect(button).toBeTruthy();
  });
});
const dataProviderStub = {

  items$: of([{
    name: "string",
    price: 1,
    isImported: true,
    category: 'string',
    quantity: 10
  } as Item])

}
