import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { NavController, IonSelect } from '@ionic/angular';

import { UserService } from '../../services/user/user.service';
import { AppGlobals } from '../../shared/app.globals';
import { RoutingParamsService } from '../../services/routing-params/routing-params.service';

import * as _ from 'lodash';
import * as $ from 'jquery';

@Component({
  selector: 'page-insurance',
  templateUrl: './insurance.page.html',
  styleUrls: ['./insurance.page.scss'],
})
export class InsurancePage implements OnInit {
  @ViewChild('contactListSelect') contactListSelect: IonSelect;

  public type: string;
  public allInsurances: Array<any> = [];
  public permanentLifeInsurances: Array<any> = [];
  public tempLifeInsurances: Array<any> = [];
  public universalLifeInsurances: Array<any> = [];
  public insurances: Array<any> = [];
  public contacts: Array<any> = [];
  public contact: any = {};
  public mainContact: any;
  public isLead: boolean = false;

  public currentNeeds: any = 0;
  public currentCoverage: any = 0;

  public svgHouseHoldLifeData: any;
  public svgHouseHoldDisabilityData: any;
  public svgHouseHoldLongtermcareData: any;
  public svgHouseHoldTravelData: any;
  public svgHouseHoldCriticalData: any;

  public svgIndividualLifeData: any;
  public svgIndividualDisabilityData: any;
  public svgIndividualLongtermcareData: any;
  public svgIndividualTravelData: any;
  public svgIndividualCriticalData: any;

  private sub: any;

  @Input() graphicData: any;

  constructor(
    public navCtrl: NavController,
    public userService: UserService,
    public appGlobal: AppGlobals,
    private routingParamService: RoutingParamsService
  ) {

  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.type = this.routingParamService.insuranceParmams.type;
    this.isLead = this.routingParamService.insuranceParmams.isLead;
    if(this.isLead) {
      this.contact = {};
    } else {
      this.contact = this.routingParamService.insuranceParmams.contact;
    }
    this.allInsurances = this.routingParamService.insuranceParmams.allInsurances;
    this.contacts = this.routingParamService.insuranceParmams.contacts;
    this.mainContact = _.find(this.contacts, {role: 'main'});
    this.getInsurances();
    try {
      this.getGraphicData();
    } catch (error) {
      console.log(error);
    }
    
  }

  getGraphicData() {
    let mainUser = this.mainContact;
    let coapplicantUser = _.find(this.contacts, {role: 'coapplicant'});
    let otherUsers = _.filter(this.contacts, function(obj){
      return obj.role == 'other';
    });
    for(let i = 0; i < 4; i++) {
      if(!otherUsers[i]) {
        otherUsers[i] = {};
      }
    }
    this.svgHouseHoldLifeData = {
      pageType : 'category',
      insuranceType : 'life',
      household: true,
      userMain : mainUser.firstname,
      userCoapplicant : coapplicantUser.firstname,
      userOther_one : otherUsers[0]['firstname'],
      userOther_two : otherUsers[1]['firstname'],
      userOther_three : otherUsers[2]['firstname'],
      userOther_four : otherUsers[3]['firstname'],
      totalHouseholdNeeds: this.userService.needsData.results.main.finalNeedIncludingMortgage + this.userService.needsData.results.coap.finalNeedIncludingMortgage,
      userMainCoverage : this.getCoverageValue('life', mainUser.id, ''),
      userCoapplicantCoverage : this.getCoverageValue('life', coapplicantUser.id, ''),
      userOtherCoverage_one : this.getCoverageValue('life', otherUsers[0].id, ''),
      userOtherCoverage_two : this.getCoverageValue('life', otherUsers[1].id, ''),
      userOtherCoverage_three : this.getCoverageValue('life', otherUsers[2].id, ''),
      userOtherCoverage_four : this.getCoverageValue('life', otherUsers[3].id, '')
    }
    this.svgHouseHoldDisabilityData = {
      pageType : 'category',
      insuranceType : 'disability',
      household: true,
      userMain : mainUser.firstname,
      userCoapplicant : coapplicantUser.firstname,
      userOther_one : otherUsers[0]['firstname'],
      userOther_two : otherUsers[1]['firstname'],
      userOther_three : otherUsers[2]['firstname'],
      userOther_four : otherUsers[3]['firstname'],
      totalHouseholdNeeds: this.userService.needsData.results.main.netDisabilityNeeds + this.userService.needsData.results.coap.netDisabilityNeeds,
      userMainCoverage : this.getCoverageValue('disability', mainUser.id, ''),
      userCoapplicantCoverage : this.getCoverageValue('disability', coapplicantUser.id, ''),
      userOtherCoverage_one : this.getCoverageValue('disability', otherUsers[0].id, ''),
      userOtherCoverage_two : this.getCoverageValue('disability', otherUsers[1].id, ''),
      userOtherCoverage_three : this.getCoverageValue('disability', otherUsers[2].id, ''),
      userOtherCoverage_four : this.getCoverageValue('disability', otherUsers[3].id, '')
    };
    this.svgHouseHoldLongtermcareData = {
      pageType : 'category',
      insuranceType : 'longtermcare',
      household: true,
      userMain : mainUser.firstname,
      userCoapplicant : coapplicantUser.firstname,
      userOther_one : otherUsers[0]['firstname'],
      userOther_two : otherUsers[1]['firstname'],
      userOther_three : otherUsers[2]['firstname'],
      userOther_four : otherUsers[3]['firstname'],
      totalHouseholdNeeds : this.userService.needsData.results.main.disabilityNeeds + this.userService.needsData.results.coap.disabilityNeeds,
      userMainCoverage : this.getCoverageValue('longtermcare', mainUser.id, ''),
      userCoapplicantCoverage : this.getCoverageValue('longtermcare', coapplicantUser.id, ''),
      userOtherCoverage_one : this.getCoverageValue('longtermcare', otherUsers[0].id, ''),
      userOtherCoverage_two : this.getCoverageValue('longtermcare', otherUsers[1].id, ''),
      userOtherCoverage_three : this.getCoverageValue('longtermcare', otherUsers[2].id, ''),
      userOtherCoverage_four : this.getCoverageValue('longtermcare', otherUsers[3].id, '')
    };
    this.svgHouseHoldCriticalData = {
      pageType : 'category',
      insuranceType : 'critical',
      household: true,
      userMain : mainUser.firstname,
      userCoapplicant : coapplicantUser.firstname,
      userOther_one : otherUsers[0]['firstname'],
      userOther_two : otherUsers[1]['firstname'],
      userOther_three : otherUsers[2]['firstname'],
      userOther_four : otherUsers[3]['firstname'],
      totalHouseholdNeeds: this.userService.needsData.results.main.criticalLowerNeed + this.userService.needsData.results.coap.criticalLowerNeed,
      userMainCoverage : this.getCoverageValue('critical', mainUser.id, ''),
      userCoapplicantCoverage : this.getCoverageValue('critical', coapplicantUser.id, ''),
      userOtherCoverage_one : this.getCoverageValue('critical', otherUsers[0].id, ''),
      userOtherCoverage_two : this.getCoverageValue('critical', otherUsers[1].id, ''),
      userOtherCoverage_three : this.getCoverageValue('critical', otherUsers[2].id, ''),
      userOtherCoverage_four : this.getCoverageValue('critical', otherUsers[3].id, '')
    };
    this.svgHouseHoldTravelData = {
      pageType : 'category',
      insuranceType : 'travel',
      household: true,
      userMain : mainUser.firstname,
      userCoapplicant : coapplicantUser.firstname,
      userOther_one : otherUsers[0]['firstname'],
      userOther_two : otherUsers[1]['firstname'],
      userOther_three : otherUsers[2]['firstname'],
      userOther_four : otherUsers[3]['firstname'],
      totalHouseholdNeeds : 0,
      userMainCoverage : this.getCoverageValue('travel', mainUser.id, ''),
      userCoapplicantCoverage : this.getCoverageValue('travel', coapplicantUser.id, ''),
      userOtherCoverage_one : this.getCoverageValue('travel', otherUsers[0].id, ''),
      userOtherCoverage_two : this.getCoverageValue('travel', otherUsers[1].id, ''),
      userOtherCoverage_three : this.getCoverageValue('travel', otherUsers[2].id, ''),
      userOtherCoverage_four : this.getCoverageValue('travel', otherUsers[3].id, '')
    };

    this.svgIndividualLifeData = {
      pageType : 'category',
      insuranceType : 'life',
      role: this.appGlobal.getRoleByContactId(this.contacts, this.contact),
      needs: this.appGlobal.getRoleByContactId(this.contacts, this.contact) == 'main' ? this.userService.needsData.results.main.finalNeedIncludingMortgage : (this.appGlobal.getRoleByContactId(this.contacts, this.contact) == 'coapplicant' ? this.userService.needsData.results.coap.finalNeedIncludingMortgage : (this.getCoverageValue('life', this.contact.id, 'wholelife') + this.getCoverageValue('life', this.contact.id, 'term') + this.getCoverageValue('life', this.contact.id, 'universal'))),
      coverage : 0,
      permanentCoverage: this.getCoverageValue('life', this.contact.id, 'wholelife'),
      temporaryCoverage : this.getCoverageValue('life', this.contact.id, 'term'),
      universalCoverage : this.getCoverageValue('life', this.contact.id, 'universal')
    };
    this.svgIndividualDisabilityData = {
      pageType : 'category',
      insuranceType : 'disability',
      role: this.appGlobal.getRoleByContactId(this.contacts, this.contact),
      needs: this.appGlobal.getRoleByContactId(this.contacts, this.contact) == 'main' ? this.userService.needsData.results.main.netDisabilityNeeds : (this.appGlobal.getRoleByContactId(this.contacts, this.contact) == 'coapplicant' ? this.userService.needsData.results.coap.netDisabilityNeeds : this.getCoverageValue('disability', this.contact.id, '')),
      coverage : this.getCoverageValue('disability', this.contact.id, ''),
      permanentCoverage: 0,
      temporaryCoverage : 0,
      universalCoverage : 0
    };
    this.svgIndividualLongtermcareData = {
      pageType : 'category',
      insuranceType : 'longtermcare',
      role: this.appGlobal.getRoleByContactId(this.contacts, this.contact),
      needs : this.appGlobal.getRoleByContactId(this.contacts, this.contact) == 'main' ? this.userService.needsData.results.main.disabilityNeeds : (this.appGlobal.getRoleByContactId(this.contacts, this.contact) == 'coapplicant' ? this.userService.needsData.results.coap.disabilityNeeds : this.getCoverageValue('longtermcare', this.contact.id, '')),
      coverage : this.getCoverageValue('longtermcare', this.contact.id, ''),
      permanentCoverage: 0,
      temporaryCoverage : 0,
      universalCoverage : 0
    };
    this.svgIndividualTravelData = {
      pageType : 'category',
      insuranceType : 'travel',
      role: this.appGlobal.getRoleByContactId(this.contacts, this.contact),
      needs : 0,
      coverage : this.getCoverageValue('travel', this.contact.id, ''),
      permanentCoverage: 0,
      temporaryCoverage : 0,
      universalCoverage : 0
    };
    this.svgIndividualCriticalData = {
      pageType : 'category',
      insuranceType : 'critical',
      role: this.appGlobal.getRoleByContactId(this.contacts, this.contact),
      needs: this.appGlobal.getRoleByContactId(this.contacts, this.contact) == 'main' ? this.userService.needsData.results.main.criticalLowerNeed : (this.appGlobal.getRoleByContactId(this.contacts, this.contact) == 'coapplicant' ? this.userService.needsData.results.coap.criticalLowerNeed : this.getCoverageValue('critical', this.contact.id, '')),
      coverage : this.getCoverageValue('critical', this.contact.id, ''),
      permanentCoverage: 0,
      temporaryCoverage : 0,
      universalCoverage : 0
    };
  }

  getCoverageValue(type: string, contactId: any, category: string) {
    let insurances;
    var that = this;

    if(category && type == 'life') {
      insurances = _.filter(this.allInsurances, function(obj){
        return obj.type == type && obj.contact_id == contactId && obj.category == category && that.appGlobal.getPolicyStatus(obj) == 'in force';
      });
    } else {
      insurances = _.filter(this.allInsurances, function(obj){
        return obj.type == type && obj.contact_id == contactId && that.appGlobal.getPolicyStatus(obj) == 'in force';
      });
    }
    return _.sumBy(insurances, function(obj) {
      return obj.details.data.death_capital ? obj.details.data.death_capital : obj.details.data.base_capital;
    });
  }

  goBack() {
    $('.animated.home-graphic.graphic-' + this.type + ' .percentage-circle').css('animation', 'none');
    $('.animated.home-graphic.graphic-' + this.type + ' .percentage-circle').css('opacity', '1');
    $('.animated.home-graphic.graphic-' + this.type + ' .percent-circle-text').css('animation', 'none');
    $('.animated.home-graphic.graphic-' + this.type + ' .percent-circle-text').css('opacity', '1');

    try {
      let varStr = 'svgHouseHold' + this.type[0].toUpperCase() + this.type.slice(1) + 'Data';
      if(this[varStr].userMainCoverage) {
        $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-main').css('animation', 'none');
        $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-main').css('opacity', '1');
      }
      if(this[varStr].userCoapplicantCoverage) {
        $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-coapplicant').css('animation', 'none');
        $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-coapplicant').css('opacity', '1');
      }
      if(this[varStr].userOtherCoverage_one) {
        $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-other-1').css('animation', 'none');
        $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-other-1').css('opacity', '1');
      }
      if(this[varStr].userOtherCoverage_two) {
        $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-other-2').css('animation', 'none');
        $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-other-2').css('opacity', '1');
      }
      if(this[varStr].userOtherCoverage_three) {
        $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-other-3').css('animation', 'none');
        $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-other-3').css('opacity', '1');
      }
      if(this[varStr].userOtherCoverage_four) {
        $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-other-4').css('animation', 'none');
        $('.animated.home-graphic.graphic-' + this.type + ' .graphic-label-user-other-4').css('opacity', '1');
      }
      if(this.type == 'life') {
        if(this.svgIndividualLifeData.permanentCoverage) {
          $('.animated.home-graphic.graphic-life .graphic-label-permanent').css('animation', 'none');
          $('.animated.home-graphic.graphic-life .graphic-label-permanent').css('opacity', '1');
        }
        if(this.svgIndividualLifeData.temporaryCoverage) {
          $('.animated.home-graphic.graphic-life .graphic-label-temporary').css('animation', 'none');
          $('.animated.home-graphic.graphic-life .graphic-label-temporary').css('opacity', '1');
        }
        if(this.svgIndividualLifeData.universalCoverage) {
          $('.animated.home-graphic.graphic-life .graphic-label-universal').css('animation', 'none');
          $('.animated.home-graphic.graphic-life .graphic-label-universal').css('opacity', '1');
        }
      }
    } catch (error) {
      console.log(error);
    }
    this.navCtrl.back();
  }

  goPolicy(policy: any) {
    this.routingParamService.insuranceParmams.policy = policy;
    this.navCtrl.navigateForward('policy', {animationDirection: 'forward'});
  }

  getItemBottomClass() {
    return this.type + '-bottom';
  }

  getHouseholdBtnClass() {
    return this.type + '-household-btn';
  }

  openContactList() {
    this.contactListSelect.open();
  }

  changeContact() {
    if(this.contact.id) {
      this.isLead = false;
    } else {
      this.isLead = true;
    }
    this.getInsurances();
    this.getGraphicData();
  }

  getInsurances() {
    let contactId = this.contact.id;
    let leadId = this.mainContact.lead_id;
    var that = this;
    if(this.type == 'life') {
      this.permanentLifeInsurances = _.filter(this.allInsurances, function(obj){
        if(!that.isLead)
          return obj.type == 'life' && obj.category == 'wholelife' && obj.contact_id == contactId && that.appGlobal.getPolicyStatus(obj) == 'in force';
        else
          return obj.type == 'life' && obj.category == 'wholelife' && obj.lead_id == leadId && that.appGlobal.getPolicyStatus(obj) == 'in force';

      });
      this.tempLifeInsurances = _.filter(this.allInsurances, function(obj){
        if(!that.isLead)
          return obj.type == 'life' && obj.category == 'term' && obj.contact_id == contactId && that.appGlobal.getPolicyStatus(obj) == 'in force';
        else
          return obj.type == 'life' && obj.category == 'term' && obj.lead_id == leadId && that.appGlobal.getPolicyStatus(obj) == 'in force';
      });
      this.universalLifeInsurances = _.filter(this.allInsurances, function(obj){
        if(!that.isLead)
          return obj.type == 'life' && obj.category == 'universal' && obj.contact_id == contactId && that.appGlobal.getPolicyStatus(obj) == 'in force';
        else
          return obj.type == 'life' && obj.category == 'universal' && obj.lead_id == leadId && that.appGlobal.getPolicyStatus(obj) == 'in force';
      });
    } else {
      this.insurances = _.filter(this.allInsurances, function(obj){
        if(!that.isLead)
          return obj.type == that.type && obj.contact_id == contactId && that.appGlobal.getPolicyStatus(obj) == 'in force';
        else
          return obj.type == that.type && obj.lead_id == leadId && that.appGlobal.getPolicyStatus(obj) == 'in force';
      });
    }
  }

  getTotalValues(type: string, subType: string) {
    let insurances;
    var field = type;
    if(this.type == 'life') {
      if(subType == 'wholelife') {
        insurances = this.permanentLifeInsurances;
      } else if(subType == 'term') {
        insurances = this.tempLifeInsurances;
      } else if(subType == 'universal') {
        insurances = this.universalLifeInsurances;
      }
    } else {
      insurances = this.insurances;
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

  goBrokerPage() {
    this.navCtrl.navigateRoot('/tabs/broker');
  }
}
