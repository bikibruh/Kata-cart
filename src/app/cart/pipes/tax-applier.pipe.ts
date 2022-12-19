import { Pipe, PipeTransform } from '@angular/core';
import {TaxComputeUtils} from "../../common/services/tax-compute.utils";

@Pipe({
  name: 'TaxApplier'
})
export class TaxApplierPipe implements PipeTransform {

  transform(price?: number, category? : string, isImported? : boolean, quantity? : number): number {
    return TaxComputeUtils.computeAProductTax(price, category, isImported, quantity);
  }

}
