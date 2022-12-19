import {Item} from "../../models/item.model";
import {UniqueCategoryPipe} from "./unique-category.pipe";
import SampleJson from '../../../assets/SampleJson.json';

describe('UniqueCategoryPipe', () => {

  it('compute a product tax', () => {
    const pipe = new UniqueCategoryPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return one item', () => {
    const pipe = new UniqueCategoryPipe();
    const result = pipe.transform([{name: "toto", category: "cat1"} as Item, {
      name: "titi",
      category: "cat1"
    } as Item, {name: "tata", category: "cat1"} as Item]);
    expect(result.length).toBe(1);
  });

  it('should return the four types', () => {
    const pipe = new UniqueCategoryPipe();
    const result = pipe.transform(SampleJson as Item[]);
    expect(result.length).toBe(5);
  });
});

