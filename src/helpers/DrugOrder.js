/* eslint-disable new-cap */
import { Record } from 'immutable';
import { dateFormat } from 'src/helpers/dateFormat';

export const ImmutableDrugOrder = Record({
  drug: undefined,
  dosingInstructions: undefined,
  duration: undefined,
  durationUnits: undefined,
  totalQuantity: undefined,
  totalQuantityUnit: undefined,
  startDate: undefined,
  additionalInstructions: undefined,
  instructions: undefined,
});

export class DrugOrder extends ImmutableDrugOrder {

  getName() {
    return `${this.drug.name} ` +
           `${this.drug.dosageForm.display}, ` +
           `${this.dosingInstructions.route}`;
  }

  getSchedule() {
    return `${this.dosingInstructions.dose} ` +
           `${this.dosingInstructions.doseUnits}, ` +
           `${this.dosingInstructions.frequency} for ` +
           `${this.duration} ${this.durationUnits} starting ` +
           `${this.startDate!=new Date()?dateFormat(this.startDate) : 'Today'}`;
  }

  getTotalQuantity() {
    return `${this.dosingInstructions.quantity}  ${this.dosingInstructions.quantityUnits}`;
  }


  getPRNStatus() {
    if(this.dosingInstructions.asNeeded){
      return 'PRN ';
    }
    return '';
  }

  getInstructions() {
    return  this.getPRNStatus() + `${this.instructions && this.instructions.name || ''}  ${this.additionalInstructions || ''}`;
  }


}
