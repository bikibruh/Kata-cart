import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {CartItemComponent} from './item/cart-item.component';
import {CartComponent} from "./cart.component";
import {MatInputModule} from "@angular/material/input";
import {NgPipesModule} from "ngx-pipes";
import {RouterLink} from "@angular/router";
import {TaxAmountPipe} from "./pipes/tax-amount.pipe";
import {TaxApplierPipe} from "./pipes/tax-applier.pipe";
import {MatGridListModule} from "@angular/material/grid-list";
import {TranslocoModule} from "@ngneat/transloco";

@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent,
    TaxAmountPipe,
    TaxApplierPipe,
  ],
  exports: [
    CartComponent,
  ],
  imports: [
    TranslocoModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgPipesModule,
    MatCardModule,
    RouterLink,
    MatGridListModule
  ]
})
export class CartModule {
}
