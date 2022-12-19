import {Pipe, PipeTransform} from '@angular/core';
import {Item} from "../../models/item.model";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(posts: Item[], searchKey: string): Item[] {
    if (!posts) return [];
    if (!searchKey) return posts;
    return search(posts, searchKey.toLowerCase());
  }
}

function search(entries: Item[], searchKey: string) {
  searchKey = searchKey.toLowerCase();
  return entries.filter(it => it.category.toLocaleLowerCase() === searchKey);
}
