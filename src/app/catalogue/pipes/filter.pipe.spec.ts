import {FilterPipe} from './filter.pipe';
import SampleJson from '../../../assets/SampleJson.json';
import {Item} from "../../models/item.model";
import {TestBed} from "@angular/core/testing";

describe('FilterPipe', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({declarations: [FilterPipe]})
      .compileComponents();

  });
  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should find books', () => {
    const pipe = new FilterPipe();
    const result = pipe.transform(SampleJson as Item[], "Books");
    expect(result.length).toBe(4);
  });

  it('should return empty when items are undefined', () => {
    const pipe = new FilterPipe();
    let items: Item[];
    // @ts-ignore
    const result = pipe.transform(items, "Books");
    expect(result.length).toBe(0);
  });

  it('should return all list when search key is undefined', () => {
    const pipe = new FilterPipe();
    let searchKey: string;
    // @ts-ignore
    const result = pipe.transform(SampleJson as Item[], searchKey);
    expect(result.length).toBe(19);
  });
});

