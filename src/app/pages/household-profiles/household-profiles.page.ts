import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { ApiService } from '../../services/api/api.service';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { RoutingParamsService } from '../../services/routing-params/routing-params.service';
import { UserService } from '../../services/user/user.service';
import { AppGlobals } from '../../shared/app.globals';

import * as _ from 'lodash';

@Component({
  selector: 'page-household-profiles',
  templateUrl: './household-profiles.page.html',
  styleUrls: ['./household-profiles.page.scss'],
})
export class HouseholdProfilesPage implements OnInit {
  public allData: any;
  public myProfile: any;
  public spouseProfile: any;
  public childs: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public apiService: ApiService,
    public userService: UserService,
    public uiUtility: UiUtilsService,
    private routingParamService: RoutingParamsService,
    public appGlobal: AppGlobals
  ) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.myProfile = _.find(this.userService.userData.contacts.data, {role: 'main'});
    this.spouseProfile = _.find(this.userService.userData.contacts.data, {role: 'coapplicant'});
    this.childs = _.filter(this.userService.userData.contacts.data, function(obj){
      return obj.role == 'other';
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  goProfileReview() {
    this.navCtrl.navigateForward('/profile-review', {animationDirection: 'forward'});
  }

  goHouseholdProfile(contact: any) {
    this.routingParamService.insuranceParmams.contact = contact;
    this.navCtrl.navigateForward('/household-profile', {animationDirection: 'forward'});
  }
}
