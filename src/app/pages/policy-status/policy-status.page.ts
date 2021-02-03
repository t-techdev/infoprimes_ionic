import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppGlobals } from '../../shared/app.globals';
import { TranslateService } from '@ngx-translate/core';
import { RoutingParamsService } from '../../services/routing-params/routing-params.service';

import * as _ from 'lodash';

@Component({
  selector: 'page-policy-status',
  templateUrl: './policy-status.page.html',
  styleUrls: ['./policy-status.page.scss'],
})
export class PolicyStatusPage implements OnInit {
  public policy: any;
  public statuses: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public appGlobal: AppGlobals,
    private translate: TranslateService,
    private routingParamsService: RoutingParamsService
  ) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.policy = this.routingParamsService.insuranceParmams.policy;
    let soldDesc, enteredDesc, sentDesc, processedDesc, receivedDesc, deliveredDesc, paidDesc, lapsDesc;
    this.translate.get('POLICY_HISTORY.DATE_SOLD_DESCRIPTION', {}).subscribe((res: string) => {
      soldDesc = res;
    });
    this.translate.get('POLICY_HISTORY.DATE_ENTERED_DESCRIPTION', {}).subscribe((res: string) => {
      enteredDesc = res;
    });
    this.translate.get('POLICY_HISTORY.DATE_SENT_DESCRIPTION', {}).subscribe((res: string) => {
      sentDesc = res;
    });
    this.translate.get('POLICY_HISTORY.DATE_PROCESSED_DESCRIPTION', {}).subscribe((res: string) => {
      processedDesc = res;
    });
    this.translate.get('POLICY_HISTORY.DATE_RECEIVED_DESCRIPTION', {}).subscribe((res: string) => {
      receivedDesc = res;
    });
    this.translate.get('POLICY_HISTORY.DATE_DELIVERED_DESCRIPTION', {}).subscribe((res: string) => {
      deliveredDesc = res;
    });
    this.translate.get('POLICY_HISTORY.DATE_PAID_DESCRIPTION', {}).subscribe((res: string) => {
      paidDesc = res;
    });
    this.translate.get('POLICY_HISTORY.DATE_LAPS_DESCRIPTION', {}).subscribe((res: string) => {
      lapsDesc = res;
    });
    this.statuses = [
      {'desc': soldDesc, 'date': this.policy.date_sold},
      {'desc': enteredDesc, 'date': this.policy.date_entered},
      {'desc': sentDesc, 'date': this.policy.date_sent},
      {'desc': processedDesc, 'date': this.policy.date_processed},
      {'desc': receivedDesc, 'date': this.policy.date_received},
      {'desc': deliveredDesc, 'date': this.policy.date_delivered},
      {'desc': lapsDesc, 'date': this.policy.date_laps}
    ];
    this.statuses = _.filter(this.statuses, function(statusObj) {
      return statusObj.date != "";
    });
    this.statuses = _.sortBy(this.statuses, function(statusObj) {
      return statusObj.date && new Date(statusObj.value);
    });
  }

  goBack() {
    this.navCtrl.back();
  }
}
