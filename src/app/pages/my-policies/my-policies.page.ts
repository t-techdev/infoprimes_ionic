import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, IonSelect } from '@ionic/angular';

import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { ApiService } from '../../services/api/api.service';

import * as _ from 'lodash';
import { UserService } from '../../services/user/user.service';
import { AppGlobals } from '../../shared/app.globals';
import { RoutingParamsService } from '../../services/routing-params/routing-params.service';

@Component({
  selector: 'page-my-policies',
  templateUrl: './my-policies.page.html',
  styleUrls: ['./my-policies.page.scss'],
})
export class MyPoliciesPage implements OnInit {
  @ViewChild('contactListSelect') contactListSelect: IonSelect;
  public contacts: Array<any> = [];
  public contact: any;
  public mainContact: any;
  public insurances: Array<any> = [];
  public policies: Array<any> = [];
  public permanentLifePolicies: Array<any> = [];
  public temporaryLifePolicies: Array<any> = [];
  public univeralLifePolicies: Array<any> = [];
  public longtermPolices: Array<any> = [];
  public criticalPolices: Array<any> = [];
  public travelPolices: Array<any> = [];
  public disabilityPolices: Array<any> = [];
  public isLead: boolean = false;

  constructor(
    public navCtrl: NavController,
    public uiUtility: UiUtilsService,
    public apiService: ApiService,
    public userService: UserService,
    public appGlobal: AppGlobals,
    private routingParamService: RoutingParamsService
  ) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.contact = this.routingParamService.insuranceParmams.contact;
    this.contacts = this.userService.userData.contacts.data;
    this.mainContact = _.find(this.contacts, {role: 'main'});
    this.insurances = this.userService.userData.insurance.data;
    this.getAllPolicies();
  }

  getAllPolicies() {
    let contactId;
    if(this.contact)
      contactId = this.contact.id;
    else
      this.isLead = true;
    let leadId = this.mainContact.lead_id;
    var that = this;
    this.disabilityPolices = _.filter(this.insurances, function(obj){
      if(!that.isLead)
        return obj.type == 'disability' && obj.contact_id == contactId;
      else
        return obj.type == 'disability' && obj.lead_id == leadId;
    });
    this.longtermPolices = _.filter(this.insurances, function(obj){
      if(!that.isLead)
        return obj.type == 'longtermcare' && obj.contact_id == contactId;
      else
        return obj.type == 'longtermcare' && obj.lead_id == leadId;
    });
    this.criticalPolices = _.filter(this.insurances, function(obj){
      if(!that.isLead)
        return obj.type == 'critical' && obj.contact_id == contactId;
      else
        return obj.type == 'critical' && obj.lead_id == leadId;
    });
    this.travelPolices = _.filter(this.insurances, function(obj){
      if(!that.isLead)
        return obj.type == 'travel' && obj.contact_id == contactId;
      else
        return obj.type == 'travel' && obj.lead_id == leadId;
    });
    this.permanentLifePolicies = _.filter(this.insurances, function(obj){
      if(!that.isLead)
        return obj.type == 'life' && obj.category == 'wholelife' && obj.contact_id == contactId;
      else
        return obj.type == 'life' && obj.category == 'wholelife' && obj.lead_id == leadId;
    });
    this.temporaryLifePolicies = _.filter(this.insurances, function(obj){
      if(!that.isLead)
        return obj.type == 'life' && obj.category == 'term' && obj.contact_id == contactId;
      else
        return obj.type == 'life' && obj.category == 'term' && obj.lead_id == leadId;
    });
    this.univeralLifePolicies = _.filter(this.insurances, function(obj){
      if(!that.isLead)
        return obj.type == 'life' && obj.category == 'universal' && obj.contact_id == contactId;
      else
        return obj.type == 'life' && obj.category == 'universal' && obj.lead_id == leadId;
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  goPolicy(policy: any) {
    this.routingParamService.insuranceParmams.policy = policy;
    this.navCtrl.navigateForward('/policy', {animationDirection: 'forward'});
  }

  changeContact() {
    if(this.contact.id) {
      this.isLead = false;
    } else {
      this.isLead = true;
    }
    this.getAllPolicies();
  }

  openContactList() {
    this.contactListSelect.open();
  }

  getTotalValues(field: string, type: string) {
    let insurances = [];
    if(type == 'life') {
      let tempArr = this.permanentLifePolicies.concat(this.temporaryLifePolicies);
      insurances = tempArr.concat(this.univeralLifePolicies);
    } else if(type == 'longtermcare') {
      insurances = this.longtermPolices;
    } else if(type == 'travel') {
      insurances = this.travelPolices;
    } else if(type == 'critical') {
      insurances = this.criticalPolices;
    } else if(type == 'disability') {
      insurances = this.disabilityPolices;
    }

    if(field == 'coverage') {
      return this.appGlobal.priceFormatRound(_.sumBy(insurances, function(obj) {
        return obj.details.data.death_capital ? obj.details.data.death_capital : obj.details.data.base_capital;
      }));
    } else {
      return this.appGlobal.priceFormat(_.sumBy(insurances, function(obj) {
        return obj ? obj.details.data.monthly_payment : 0;
      }), 2);
    }
  }
}
