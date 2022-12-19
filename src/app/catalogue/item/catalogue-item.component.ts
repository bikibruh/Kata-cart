import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Item} from "../../models/item.model";

@Component({
  selector: 'app-item',
  templateUrl: './catalogue-item.component.html',
  styleUrls: ['catalogue-item.component.scss']
})
export class CatalogueItemComponent {

  @Input() item: Item | undefined;
  @Output() addToCartEventEmitter = new EventEmitter();

  addToCart(item: Item | undefined): void {
    this.addToCartEventEmitter.emit(item);
  }
}
