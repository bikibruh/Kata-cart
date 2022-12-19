import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CatalogueItemComponent} from './catalogue-item.component';
import {MatCardModule} from "@angular/material/card";
import {Item} from "../../models/item.model";
import {TranslocoModule} from "@ngneat/transloco";

let item = {
  name: "string",
  price: 1,
  isImported: true,
  category: 'string',
  quantity: 10
} as Item;
describe('CatalogueItemComponent', () => {
  let component: CatalogueItemComponent;
  let fixture: ComponentFixture<CatalogueItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogueItemComponent],
      imports: [
        MatCardModule,
        TranslocoModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CatalogueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show Ajouter when we have enough quanity', () => {
    component.item = item;
    const ajouter_button = fixture.debugElement.nativeElement.querySelector('#ajouter-button');
    expect(ajouter_button.innerHTML).toContain('ajouter🛒');
  });

  it('should disable Ajouter when we dont have enough quanity', () => {
    component.item = {...item, quantity: 0};
    fixture.detectChanges();
    const ajouter_button = fixture.debugElement.nativeElement.querySelector('#ajouter-button');
    expect(ajouter_button.disabled).toBe(true);
  });

  it('should show available quanity', () => {
    component.item = item;
    fixture.detectChanges();
    const qte_button = fixture.debugElement.nativeElement.querySelector('#qte-button');
    expect(qte_button.disabled).toBe(false);
  });

  it('should show qte 0 when theres no available quanity', () => {
    component.item = {...item, quantity: 0};
    fixture.detectChanges();
    const qte_button = fixture.debugElement.nativeElement.querySelector('#non-dispo-button');

    expect(qte_button.disabled).toBe(true);
  });
});
