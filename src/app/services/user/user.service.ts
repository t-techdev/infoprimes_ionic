import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public lang: string;
  public userID: string;
  public leadIds: Array<any> = [];
  public leadId: string;
  public userData: any;
  public mainData: any;
  public coapplicantData: any;
  public otherData: any;
  public mortgageData: any;
  public externalData: any;
  public needsData: any;
  public fnaId: any;
  public isLeadIdChanged: boolean = true;
  public token: string;
  public userLastResUnixTime: any;

  constructor(
    public translate: TranslateService,
    private storage: Storage
  ) {
      this.init();
  }

  init() {
  }

  setLang(lang: string) {
    this.lang = (lang == 'french' || lang == 'fr') ? 'fr' : 'en';
    this.translate.setDefaultLang(this.lang);
  }

  setUserLeadId(leadId, leadIdArr) {
    this.leadId = leadId;
    this.leadIds = leadIdArr;
    this.storage.set('leadId', leadId);
    this.storage.set('leadIdArr', JSON.stringify(leadIdArr));
  }

  accessTokenExpired(userLastResUnixTime) {
    if(!userLastResUnixTime) return false;
    let curUnitTime = moment().unix();
    let expirationTime = userLastResUnixTime + (58 * 60);
    if(curUnitTime > expirationTime) return true;
    else return false;
  }

  setAccessToken(response) {
    let tmpResBody = (response.body == null) ? {} : response.body;
    let token = tmpResBody.token ? response.body.token : response.headers.get('Authorization').split('Bearer ')[1];
    
    this.storage.set('token', token);
    this.token = token;

    this.storage.set('userLastResUnixTime', moment().unix());
    this.userLastResUnixTime = moment().unix();
  }

  removeAccessToken() {
    this.storage.remove('token');
    this.token = '';
    this.storage.remove('userLastResUnixTime');
    this.userLastResUnixTime = '';
  }
}
