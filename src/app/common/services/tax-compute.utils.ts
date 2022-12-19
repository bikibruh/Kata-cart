import {CartItem} from "../../models/cart-item";


export const SPECIAL_ITEM = "Livre";
export const ROUNDING_VALUE = 20;
export const SPECIAL_ITEM_TAX_PERCENTAGE = 10;
export const ITEM_TAX_PERCENTAGE = 20;
export const IMPORT_TAX_PERCENTAGE = 5;
export const FRACTION_DIGITS = 2;

export class TaxComputeUtils {


  static computeTTCPrice(price?: number, category?: string, isImported?: boolean) {
    if (price && category) {
      let rate = this.getProductTaxRate(isImported, category);
      let result = rate * price / 100 + price;
      return this.roundNumberToHighestFiveCents(result);

    }
    return 0;
  }

  static computeAProductTax(price?: number, category?: string, isImported?: boolean, quantity?: number) {
    if (price && category && quantity) {
      let result = TaxComputeUtils.getProductTaxRate(isImported, category) / 100 * price * quantity;
      return this.roundNumberToHighestFiveCents(result);
    }
    return 0;
  }

  static computeTTCPriceFor(items: CartItem[]): number {
    let sum = 0;
    items.forEach(item => {
      sum += this.computeTTCPrice(item.price, item.category, item.isImported);
    })
    return sum;
  }

  static computeHtPriceFor(items: CartItem[]): number {
    if (items && items.length !== 0) {
      if (items.length == 1) return items[0].quantity * items[0].price
      return items.map(a => a.quantity * a.price)
        .reduce(function (a, b) {
          return a + b;
        });
    }
    return 0;
  }

  private static getProductTaxRate(isImported?: boolean, product?: string) {
    let rate = SPECIAL_ITEM.toLowerCase() === product?.toLowerCase() ?
      SPECIAL_ITEM_TAX_PERCENTAGE : ITEM_TAX_PERCENTAGE;
    if (isImported) rate += IMPORT_TAX_PERCENTAGE;
    return rate;
  }

  private static roundNumberToHighestFiveCents(price: number) {
    return +(Math.ceil(price * ROUNDING_VALUE) / ROUNDING_VALUE).toFixed(FRACTION_DIGITS);
  }
}
