import {Component} from '@angular/core';
import {Item} from "../models/item.model";
import {DataProviderService} from "../services/data-provider.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent {
  items$: Observable<Item[]>;
  searchText: string = "";
  gridColumns: number;
  cartArticleCount$: Observable<number>;

  private readonly PX_DISPLAY_DESKTOP = 768;

  private readonly MAX_CARDS_TO_DISPLAY_DESKTOP = 3;

  private readonly MAX_CARDS_TO_DISPLAY_PHONE = 1;

  constructor(private dataProvider: DataProviderService) {
    this.gridColumns = window.innerWidth >= this.PX_DISPLAY_DESKTOP ? this.MAX_CARDS_TO_DISPLAY_DESKTOP : this.MAX_CARDS_TO_DISPLAY_PHONE;
    this.items$ = this.dataProvider.items$;
    this.cartArticleCount$ = this.dataProvider.cartArticleCount$;
  }

  addItemToCart(event: any) {
    this.dataProvider
      .addItemToCart(event);
  }
}
