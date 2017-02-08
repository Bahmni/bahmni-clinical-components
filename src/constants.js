export const prescriptionStatus = {
  Active: 'active',
  Scheduled: 'sched',
  Finished: 'finished',
  Stopped: 'stpd',
};

export const urlConstants = {
  drugOptionUrl: '/openmrs/ws/rest/v1/drug',
  allDrugHistory: '/openmrs/ws/rest/v1/bahmnicore/drugOrders?' +
                  'includeActiveVisit=true&numberOfVisits=3&patientUuid=',
};
