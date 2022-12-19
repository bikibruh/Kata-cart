import {SPECIAL_ITEM, TaxComputeUtils} from "./tax-compute.utils";
import {CartItem} from "../../models/cart-item";

describe('TaxComputeUtils', () => {
  it('should compute ttc for a book not imported', () => {
    expect(TaxComputeUtils.computeTTCPrice(10.01, SPECIAL_ITEM, false)).toBe(11.05);

  });
  it('should compute ttc for an imported book', () => {
    expect(TaxComputeUtils.computeTTCPrice(10, SPECIAL_ITEM, true)).toBe(11.5);
  });

  it('should compute ttc for a food item not imported', () => {
    expect(TaxComputeUtils.computeTTCPrice(10, "Food", false)).toBe(12);

  });
  it('should compute ttc for an imported food item', () => {
    expect(TaxComputeUtils.computeTTCPrice(10.01, "Food", false)).toBe(12.05);
  });

  it('should compute tax for books not imported', () => {
    expect(TaxComputeUtils.computeAProductTax(10.01, SPECIAL_ITEM, false, 10)).toBe(10.05);

  });
  it('should compute tax for imported books', () => {
    expect(TaxComputeUtils.computeAProductTax(10, SPECIAL_ITEM, true, 10)).toBe(15);
  });

  it('should compute tax for food items not imported', () => {
    expect(TaxComputeUtils.computeAProductTax(10, "Food", false, 10)).toBe(20);

  });
  it('should compute tax for imported food items', () => {
    expect(TaxComputeUtils.computeAProductTax(10.01, "Food", false, 10)).toBe(20.05);
  });

  it('should compute tax for a book not imported', () => {
    expect(TaxComputeUtils.computeAProductTax(10.01, SPECIAL_ITEM, false, 1)).toBe(1.05);

  });
  it('should compute tax for imported book', () => {
    expect(TaxComputeUtils.computeAProductTax(10, SPECIAL_ITEM, true, 1)).toBe(1.5);
  });

  it('should compute tax for a food item not imported', () => {
    expect(TaxComputeUtils.computeAProductTax(10, "Food", false, 1)).toBe(2);

  });
  it('should compute tax for imported food item', () => {
    expect(TaxComputeUtils.computeAProductTax(10.01, "Food", false, 1)).toBe(2.05);
  });
  it('should compute ttc price for items', () => {
    expect(TaxComputeUtils.computeTTCPriceFor(items)).toBe(12.5);
  });
  it('should compute ht price for items', () => {
    expect(TaxComputeUtils.computeHtPriceFor(items)).toBe(10);
  });
});

let items: CartItem[] = [{
  name: "a food",
  category: "food",
  price: 10,
  isImported: true,
  quantity: 1,
  canIncreaseQuantity: true
}]
