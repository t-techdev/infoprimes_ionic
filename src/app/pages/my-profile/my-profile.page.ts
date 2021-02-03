import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { ApiService } from '../../services/api/api.service';
import { UserService } from '../../services/user/user.service';
import { AppGlobals } from '../../shared/app.globals';
import { RoutingParamsService } from '../../services/routing-params/routing-params.service';
import { TranslateService } from '@ngx-translate/core';

import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'page-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  public allData: any;
  public myProfile: any;
  public subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public apiService: ApiService,
    public userService: UserService,
    private routingParamService: RoutingParamsService,
    public translate: TranslateService,
    public appGlobal: AppGlobals
  ) {

  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.loadData();
  }

  ionViewWillLeave() {
    
  }

  loadData() {
    this.myProfile = _.find(this.userService.userData.contacts.data, {role: 'main'});
    this.allData = this.userService.userData;
  }

  goSetting() {
    this.navCtrl.navigateForward('/setting', {animationDirection: 'forward'});
  }

  goHouseholdProfiles() {
    this.navCtrl.navigateForward('/household-profiles', {animationDirection: 'forward'});
  }

  goHouseholdProfile(contact: any) {
    this.routingParamService.insuranceParmams.contact = contact;
    this.navCtrl.navigateForward('/household-profile', {animationDirection: 'forward'});
  }

  goProfileReview() {
    this.navCtrl.navigateForward('/profile-review', {animationDirection: 'forward'});
  }

  goMyPolicies() {
    this.navCtrl.navigateForward('/my-policies', {animationDirection: 'forward'});
  }
}
