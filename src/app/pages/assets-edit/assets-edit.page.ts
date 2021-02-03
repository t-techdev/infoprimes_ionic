import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Storage } from '@ionic/storage';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { UserService } from '../../services/user/user.service';
import { ApiService } from '../../services/api/api.service';
import { AppGlobals } from '../../shared/app.globals';

import * as _ from 'lodash';

@Component({
  selector: 'page-assets-edit',
  templateUrl: './assets-edit.page.html',
  styleUrls: ['./assets-edit.page.scss'],
})
export class AssetsEditPage implements OnInit {
  private action: string;
  public data: any;
  public overallData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private keyboard: Keyboard,
    private storage: Storage,
    public uiUtility: UiUtilsService,
    public userService: UserService,
    public apiService: ApiService,
    private appGlobal: AppGlobals
  ) {
    this.keyboard.hideFormAccessoryBar(false);
  }

  ngOnInit() {
    this.action = this.navParams.get('action');
    this.overallData = this.navParams.get('data');
    this.data = this.navParams.get('data').asset.data;
  }

  close() {
    this.keyboard.hideFormAccessoryBar(true);
    this.modalCtrl.dismiss();
  }

  saveClick() {
    this.save();
  }

  save() {
    this.overallData.asset.data.base = this.data.base;
    this.overallData.asset.data.term_deposit = this.data.term_deposit;
    this.overallData.asset.data.reer_cri = this.data.reer_cri;
    this.overallData.asset.data.ferr = this.data.ferr;
    this.overallData.asset.data.pension = this.data.pension;
    this.overallData.asset.data.vehicle = this.data.vehicle;
    this.overallData.asset.data.tools = this.data.tools;
    this.overallData.asset.data.land = this.data.land;
    this.overallData.asset.data.cottage = this.data.cottage;
    this.overallData.asset.data.real_state = this.data.real_state;
    this.overallData.asset.data.others = this.data.others;

    var that = this;
    var individual_life_other = 0;
    var collective_life_other = 0;
    var celi = 0;
    var reee = 0;
    var reer = 0;
    var unregistered = 0;

    _.forEach(this.userService.externalData, function(ele: any) {
      if(typeof(ele.insured) == 'string')
        var insured = JSON.parse(ele.insured);
      else 
        var insured = ele.insured;
      if(insured && !insured.length) {
        var newArr = [insured];
        insured = newArr;
      }
      if(_.includes(insured, that.overallData.id.toString()) || _.includes(insured, that.overallData.id)) {
        switch(ele.type) {
          case 'individual_life_other':
            individual_life_other = individual_life_other + ele.capital;
          break;
          case 'collective_life_other':
            collective_life_other = collective_life_other + ele.capital;
          break;
          case 'celi':
            celi = celi + ele.capital;
          break;
          case 'reee':
            reee = reee + ele.capital;
          break;
          case 'reer':
            reer = reer + ele.capital;
          break;
          case 'unregistered':
            unregistered = unregistered + ele.capital;
          break;
        }
        that.overallData.asset.data.individual_life_other = individual_life_other;
        that.overallData.asset.data.collective_life_other = collective_life_other;
        that.overallData.asset.data.celi = celi;
        that.overallData.asset.data.reee = reee;
        that.overallData.asset.data.reer = reer;
        that.overallData.asset.data.unregistered = unregistered;
      }
    });
    
    this.uiUtility.showLoader();
    this.apiService.patch('/client/fna/' + this.userService.fnaId +'/contact/' + this.overallData.id, this.overallData)
      .subscribe((res) => {
        this.userService.setAccessToken(res);
        this.uiUtility.hideLoader();
        this.close();
      },
      (e) => {
        this.close();
      });
      
  }
}
