import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { ApiService } from '../../services/api/api.service';
import { UserService } from '../../services/user/user.service';
import { AppGlobals } from '../../shared/app.globals';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import * as _ from 'lodash';

@Component({
  selector: 'page-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  public language: string;
  public allData: any;
  public myProfile: any;
  public leadId: any;

  public month: string;
  public year: string;
  public day: string;
  public months: any;
  public days: any;

  constructor(
    public navCtrl: NavController,
    private uiUtility: UiUtilsService,
    public apiService: ApiService,
    public userService: UserService,
    public appGlobal: AppGlobals,
    public translate: TranslateService,
    private storage: Storage,
    private router: Router,
    private oneSignal: OneSignal
  ) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.myProfile = _.find(this.userService.userData.contacts.data, {role: 'main'});
    this.language = this.userService.lang;
    this.leadId = this.userService.leadId;

    this.months = this.appGlobal.months;
    this.days = this.appGlobal.getDays('', this.month);
    this.day = "0";
    this.month = "0";
  }

  onChangeMonth() {
    this.days = this.appGlobal.getDays('', this.month);
    if(this.day > this.days.length) this.day = '';
  }

  goBack() {
    if(!this.userService.isLeadIdChanged)
      this.navCtrl.back();
    else
      this.router.navigate(['/tabs']);
  }

  confirmLogout() {
    let that = this;
    let logout = function() {
      if(window.cordova) {
        that.oneSignal.getIds().then((ids) => {
          that.logoutProc(ids.userId);
        })
      } else {
        that.logoutProc();
      }
    }
    this.translate.get(['GENERIC.CONFIRM', 'GENERIC.ARE_YOU_SURE', 'GENERIC.CANCEL', 'GENERIC.OKAY'], {}).subscribe((res: string) => {
      this.uiUtility.confirmAlertBox(res['GENERIC.CONFIRM'], res['GENERIC.ARE_YOU_SURE'], res['GENERIC.CANCEL'], res['GENERIC.OKAY'], function() {}, logout);
    });
  }

  logoutProc(deviceToken: string = '') {
    if(deviceToken) {
      this.uiUtility.showLoader();
      this.apiService.post('/auth/logout', {device_token: deviceToken}, { observe: 'response' })
        .then(res => {
          this.userService.setAccessToken(res);
          this.uiUtility.hideLoader();

          this.userService.removeAccessToken();
          // this.userService.setUserLeadId('', []);
          this.appGlobal.passedAuthPhases = false;
          this.appGlobal.unLocked = false;
          this.userService.userID = '';
          this.userService.isLeadIdChanged = true;
          this.navCtrl.navigateRoot('/login');
        })
        .catch(e => {
          console.log(e);
          this.uiUtility.hideLoader();
        });
    } else {
      this.userService.removeAccessToken();
      // this.userService.setUserLeadId('', []);
      this.appGlobal.passedAuthPhases = false;
      this.appGlobal.unLocked = false;
      this.userService.userID = '';
      this.userService.isLeadIdChanged = true;
      this.navCtrl.navigateRoot('/login');
    }
  }

  changeLang() {
    this.setLang(this.language);
  }

  setLang(lang: string) {
    this.userService.setLang(lang);
  }

  changeLeadId() {
    this.userService.isLeadIdChanged = true;
    this.userService.setUserLeadId(this.leadId, this.userService.leadIds);
    if(!this.userService.token) return false;
    let params = {
      include: 'contacts,insurance,insurance.details,insurance.beneficiaries,insurance.holders,insurance.product,assignments'
    };
    this.uiUtility.showLoader();
    this.apiService.get('/client/data/' + this.userService.leadId, params)
      .subscribe((res) => {
        this.uiUtility.hideLoader();
        this.userService.setAccessToken(res);
        this.userService.userData = res.body.data;
        this.init();
      },
      (e) => {});
  }

}
