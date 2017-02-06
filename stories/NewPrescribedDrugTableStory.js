import React from 'react';
import  NewPrescribedDrugTable  from 'src/components/medication/NewPrescribedDrugTable.jsx';
import {DrugOrder} from 'src/helpers/DrugOrder';

const drugOrder1 = new DrugOrder({
  drug: {
    name: 'Ibuprofen',
    form: "Tablet(s)"
  },
  dosingInstructions:{
    dose:120,
    doseUnits:"Tablet(s)",
    route:"Oral",
    frequency:"Twice a day",
    asNeeded:true,
    quantity:2880,
    quantityUnits:"Tablet(s)"
  },
  duration:12,
  durationUnits:"Day(s)"
});

const NewPrescribedDrugTableStory = () => (
  <div>
    <NewPrescribedDrugTable headers={['Drug Name', 'Dose']}
                            drugOrderList={[drugOrder1]}></NewPrescribedDrugTable>
  </div>
);

export default NewPrescribedDrugTableStory;
