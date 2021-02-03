import { Injectable } from '@angular/core';

class InsuranceParams {
  type: any;
  allInsurances: any;
  contacts: any;
  isLead: any;
  contact: any;
  policy: any
}

@Injectable({
  providedIn: 'root'
})

export class RoutingParamsService {

  public insuranceParmams: InsuranceParams
  constructor(
  ) {
    this.insuranceParmams = {
      type: '',
      allInsurances: '',
      contacts: '',
      isLead: '',
      contact: '',
      policy: ''
    }
  }

}
