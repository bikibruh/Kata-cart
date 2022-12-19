import {Pipe, PipeTransform} from '@angular/core';
import {Item} from "../../models/item.model";

@Pipe({
  name: 'uniqueCategory'
})
export class UniqueCategoryPipe implements PipeTransform {
  transform(items: Item[]): string[] {
    return [...new Set(items.map(item => item.category))];
  }
}
