import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { ApiService } from '../../services/api/api.service';
import { AppGlobals } from '../../shared/app.globals';
import { UserService } from '../../services/user/user.service';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { TranslateService } from '@ngx-translate/core';

import * as _ from 'lodash';
import { Subscription } from 'rxjs';
declare var cordova;

@Component({
  selector: 'page-broker',
  templateUrl: './broker.page.html',
  styleUrls: ['./broker.page.scss'],
})
export class BrokerPage implements OnInit {
  public myBroker: any;
  private email;
  public subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public uiUtility: UiUtilsService,
    public apiService: ApiService,
    private sms: SMS,
    private callNumber: CallNumber,
    private platform: Platform,
    public translate: TranslateService,
    public userService: UserService,
    private appGlobal: AppGlobals
  ) {

  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    let brokers = this.userService.userData.assignments.data;
    let contacts = this.userService.userData.contacts.data;
    let myContact = _.find(contacts, {role: 'main'});
    let broker = _.find(brokers, {lead_id: myContact.lead_id});
    this.myBroker = broker.user ? broker.user.data : {};
  }

  ionViewWillLeave() {
    this.appGlobal.preventPauseEV_1 = false;
    this.appGlobal.preventPauseEV_2 = false;
    this.appGlobal.preventPauseEV_3 = false;
    this.appGlobal.preventPauseEV_4 = false;
  }

  callPhone(number) {
    this.appGlobal.preventPauseEV_1 = true;
    setTimeout(() => {
      this.appGlobal.preventPauseEV_1 = false;
      this.appGlobal.preventPauseEV_2 = false;
      this.appGlobal.preventPauseEV_3 = false;
      this.appGlobal.preventPauseEV_4 = false;
    }, 9000);
    this.callNumber.callNumber(number, true)
      .then(res => {
        console.log('Launched dialer!', res)}
      )
      .catch(err => {
        console.log('Error launching dialer', err);
      });
  }

  smsPhone(number) {
    this.appGlobal.preventPauseEV_2 = true;
    setTimeout(() => {
      this.appGlobal.preventPauseEV_1 = false;
      this.appGlobal.preventPauseEV_2 = false;
      this.appGlobal.preventPauseEV_3 = false;
      this.appGlobal.preventPauseEV_4 = false;
    }, 9000);
    this.translate.get('BROKER.SMS_BASE_MESSAGE', {}).subscribe((res: string) => {
      this.sms.send(number, res, {replaceLineBreaks: false, android: {intent: 'INTENT'}})
        .then(res => { console.log('smsPhone open success: ', res); })
        .catch(e => { console.log('smsPhone error: ', e); });
    });
  }

  sendEmail(email) {
    this.appGlobal.preventPauseEV_3 = true;
    setTimeout(() => {
      this.appGlobal.preventPauseEV_1 = false;
      this.appGlobal.preventPauseEV_2 = false;
      this.appGlobal.preventPauseEV_3 = false;
      this.appGlobal.preventPauseEV_4 = false;
    }, 9000);

    if (this.platform.is('cordova')) {
      cordova.plugins.email.isAvailable(function (hasAccount) {
        if(hasAccount) {
          let sendEmail = {
            to: email,
            subject: '',
            body: ''
          }
          cordova.plugins.email.open(sendEmail);
        }
      });
    }
  }
}
