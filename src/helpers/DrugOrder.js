import { Record, List } from 'immutable';

export const ImmutableDrugOrder = Record({
  drug: undefined,
  dosingInstructions : undefined,
  duration:undefined,
  durationUnits:undefined,
  totalQuantity: undefined,
  totalQuantityUnit: undefined,
  startDate: undefined,
  additionalInstructions:undefined,
 });

export class DrugOrder extends ImmutableDrugOrder {

  getName() {
    return `${this.drug.name} , (${this.drug.dosageForm.display}),  ${this.dosingInstructions.route}`;
  }

  getSchedule(){
    return `${this.dosingInstructions.dose} ${this.dosingInstructions.doseUnits}, ${this.dosingInstructions.frequency} for 
        ${this.duration} ${this.durationUnits} starting ${this.startDate  || ' Today'}`;
  }

  getTotalQuantity(){
    return `${this.dosingInstructions.quantity}  ${this.dosingInstructions.quantityUnits}`;
  }


  getInstructions(){
    return `${this.dosingInstructions.asNeeded && 'PRN'}`;
  }


}
