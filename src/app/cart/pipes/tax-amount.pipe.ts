import { Pipe, PipeTransform } from '@angular/core';
import {TaxComputeUtils} from "../../common/services/tax-compute.utils";

@Pipe({
  name: 'TaxAmount'
})
export class TaxAmountPipe implements PipeTransform {

  transform(value?: number, type? : string, isImported? : boolean): number {
      return TaxComputeUtils.computeTTCPrice(value,type,isImported)
  }


}
