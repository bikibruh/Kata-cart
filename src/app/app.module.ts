import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {CatalogModule} from "./catalogue/catalog.module";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";
import {CartModule} from "./cart/cart.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DataProviderService} from "./services/data-provider.service";
import { RouterModule } from '@angular/router';
import {CatalogueComponent} from "./catalogue/catalogue.component";
import {CartComponent} from "./cart/cart.component";
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import {TranslocoRootModule} from "./common/translate/transloco.module";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    TranslocoRootModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatGridListModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatBadgeModule,
    FlexLayoutModule,
    CartModule,
    CatalogModule,
    RouterModule.forRoot([
      {path: '', component: CatalogueComponent},
      {path: 'panier', component: CartComponent},
      {path: '**', component: PageNotFoundComponent}
    ]),
  ],
  providers: [DataProviderService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
