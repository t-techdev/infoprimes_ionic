import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { ApiService } from '../../services/api/api.service';
import { AppGlobals } from '../../shared/app.globals';
import { UserService } from '../../services/user/user.service';
import { RoutingParamsService } from '../../services/routing-params/routing-params.service';

import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'page-policy',
  templateUrl: './policy.page.html',
  styleUrls: ['./policy.page.scss'],
})
export class PolicyPage implements OnInit {
  public policy: any;
  public policyHousehold: any;
  public beneficiaries: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public uiUtility: UiUtilsService,
    public apiService: ApiService,
    public userService: UserService,
    public appGlobal: AppGlobals,
    private routingParamsService: RoutingParamsService
  ) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.policy = this.routingParamsService.insuranceParmams.policy;
    let contacts = this.userService.userData.contacts.data;
    this.policyHousehold = _.find(contacts, {id: this.policy.contact_id});
    var that = this;
    _.forEach(this.policy.beneficiaries.data, function(beneficiary) {
      that.beneficiaries.push(_.find(contacts, {id: beneficiary.contact_id}));
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  goPolicyStatus(policy: any) {
    this.routingParamsService.insuranceParmams.policy = policy;
    this.navCtrl.navigateForward('/policy-status', {animationDirection: 'forward'});
  }

  goHouseholdProfile(contact: string) {
    this.routingParamsService.insuranceParmams.contact = contact;
    this.navCtrl.navigateForward('/household-profile', {animationDirection: 'forward'});
  }

  goPaperWork() {
    this.navCtrl.navigateForward('/paperwork', {animationDirection: 'forward'});
  }

  goBroker() {
    this.navCtrl.navigateRoot('/tabs/broker');
  }

  calcDate(deliveredDate: any, durationYears: any, format: string) {
    return moment(deliveredDate, format).add(durationYears, 'y');
  }

}
