import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, IonSelect } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { ApiService } from '../../services/api/api.service';
import { AppGlobals } from '../../shared/app.globals';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as _ from 'lodash';
@Component({
  selector: 'page-insurance-invest-edit',
  templateUrl: './insurance-invest-edit.page.html',
  styleUrls: ['./insurance-invest-edit.page.scss'],
})
export class InsuranceInvestEditPage implements OnInit {
  formGroup: FormGroup;
  @ViewChild('typeSelect') typeSelect: IonSelect;

  public action: string;
  public data: any;
  public type: string;
  public company: string;
  public capital: string;
  public monthlyPayment: number;
  public duration: any;
  public policyholder: any;
  public policyholders: Array<any> = [];
  public selectOpts: any;
  public actionBtnAttempt: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private userService: UserService,
    private uiUtility: UiUtilsService,
    public appGlobal: AppGlobals,
    private apiService: ApiService
  ) {
    this.action = this.navParams.get('action');
    this.data   = this.navParams.get('data');
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      type: new FormControl('', Validators.compose([
        Validators.required
      ])),
      company: new FormControl('', Validators.compose([
        Validators.required
      ])),
      capital: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
    this.init();
  }

  init() {
    if(this.action == 'edit') {
      this.type = this.data.type;
      this.company = this.data.company;
      this.capital = this.data.capital;
      this.monthlyPayment = this.data.premium ? this.data.premium : 0;
      this.duration = this.duration ? this.duration : 0;
      this.policyholder = JSON.stringify(this.data.insured);
      this.policyholder = this.policyholder.replace(/\\/g, '');
      this.policyholder = this.policyholder.replace(/['"]+/g, '');
      this.policyholder = JSON.parse(this.policyholder);
      let newPolicyholderArr = [];
      _.forEach(this.policyholder, function(e) {
        newPolicyholderArr.push(e.toString());
      })
      this.policyholder = newPolicyholderArr;
    }
    this.getPolicyHolders();
  }

  getPolicyHolders() {
    var that  = this;
    this.policyholders.push({
      id: this.userService.mainData.id,
      fullname: this.userService.mainData.firstname + ' ' + this.userService.mainData.lastname
    });
    if(this.userService.coapplicantData.firstname == undefined || this.userService.coapplicantData.lastname == undefined) {}
    else
      this.policyholders.push({
        id: this.userService.coapplicantData.id,
        fullname: this.userService.coapplicantData.firstname + ' ' + this.userService.coapplicantData.lastname
      });
    _.forEach(this.userService.otherData, function(obj) {
      if(obj.firstname == undefined || obj.lastname == undefined) {}
      else
        that.policyholders.push({
          id: obj.id,
          fullname: obj.firstname + ' ' + obj.lastname
        });
    });
  }

  saveClick() {
    this.actionBtnAttempt = true;
    if(!this.formGroup.get('type').hasError('required') && !this.formGroup.get('company').hasError('required') && !this.formGroup.get('capital').hasError('required')) {
      this.save();
    }
  }

  save() {
    this.data.type = this.type;
    this.data.company = this.company;
    this.data.capital = this.capital;
    this.data.premium = this.monthlyPayment ? this.monthlyPayment : 0;
    this.data.duration = this.duration ? this.duration : 0;
    this.data.insured = this.policyholder;

    if(this.action == 'edit') {
      this.uiUtility.showLoader();
      this.apiService.patch('/client/fna/' + this.userService.fnaId +'/external/' + this.data.id, this.data)
        .subscribe((res) => {
          this.userService.setAccessToken(res);
          this.uiUtility.hideLoader();
          this.close();
        },
        (e) => {
          this.close();
        });
    } else {
      if(this.data.type && this.data.company && this.data.capital && this.data.premium && this.data.duration && this.data.insured) {
        this.data.abf_id = this.userService.fnaId;
          this.uiUtility.showLoader();
          this.apiService.post('/client/fna/' + this.userService.fnaId +'/external', this.data, { observe: 'response' })
            .then((res: any) => {
              this.userService.setAccessToken(res);
              this.userService.externalData.push(res.body.data);
              this.uiUtility.hideLoader();
              this.close();
            })
            .catch((e: any) => { 
              this.close();
            });
        }
    }
  }
  
  close() {
    this.modalCtrl.dismiss();
  }
}
