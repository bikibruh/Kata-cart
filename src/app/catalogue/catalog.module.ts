import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {MatListModule} from "@angular/material/list";
import {BrowserModule} from "@angular/platform-browser";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {FilterPipe} from "./pipes/filter.pipe";
import {CatalogueComponent} from "./catalogue.component";
import {CatalogueItemComponent} from "./item/catalogue-item.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {RouterLink} from "@angular/router";
import {UniqueCategoryPipe} from "./pipes/unique-category.pipe";
import {TranslocoModule} from "@ngneat/transloco";

@NgModule({
  declarations: [
    CatalogueComponent,
    CatalogueItemComponent,
    FilterPipe,
    UniqueCategoryPipe
  ],
  exports: [
    CatalogueComponent
  ],
  imports: [
    TranslocoModule,
    CommonModule,
    HttpClientModule,
    MatListModule,
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatToolbarModule,
    FormsModule,
    MatSelectModule,
    MatGridListModule,
    RouterLink
  ]
})
export class CatalogModule {
}
