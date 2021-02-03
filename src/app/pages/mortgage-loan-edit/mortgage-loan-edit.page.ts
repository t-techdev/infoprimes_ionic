import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, IonSelect } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AppGlobals } from '../../shared/app.globals';
import { UserService } from '../../services/user/user.service';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { ApiService } from '../../services/api/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as _ from 'lodash';

@Component({
  selector: 'page-mortgage-loan-edit',
  templateUrl: './mortgage-loan-edit.page.html',
  styleUrls: ['./mortgage-loan-edit.page.scss'],
})
export class MortgageLoanEditPage implements OnInit {
  formGroup: FormGroup;
  @ViewChild('loanTypeSelect') loanTypeSelect: IonSelect;
  @ViewChild('percentSelect') percentSelect: IonSelect;
  @ViewChild('monthSelect') monthSelect: IonSelect;
  @ViewChild('daySelect') daySelect: IonSelect;
  @ViewChild('yearSelect') yearSelect: IonSelect;
  @ViewChild('borrowersSelect') borrowersSelect: IonSelect;

  public action: string;
  public title: string;
  public data: any;
  public type: string;
  public insurance: string;
  public amount: string;
  public duration: string;
  public monthly: string;
  public institution: string;
  public year: string;
  public month: string;
  public day: string;
  public days: any;
  public borrowers: Array<any> = [];
  public borrower: any;
  public actionBtnAttempt: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private translate: TranslateService,
    public appGlobal: AppGlobals,
    private userService: UserService,
    private uiUtility: UiUtilsService,
    private apiService: ApiService
  ) {
    this.action = this.navParams.get('action');
    this.data = this.navParams.get('data');
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      type: new FormControl('', Validators.compose([

      ])),
      institution: new FormControl('', Validators.compose([

      ])),
      insurance: new FormControl('', Validators.compose([

      ])),
      amount: new FormControl('', Validators.compose([
        Validators.required
      ])),
      duration: new FormControl('', Validators.compose([

      ])),
      day: new FormControl('', Validators.compose([

      ])),
      month: new FormControl('', Validators.compose([

      ])),
      year: new FormControl('', Validators.compose([

      ])),
      monthly: new FormControl('', Validators.compose([
        Validators.required
      ])),
      borrower: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
    this.init();
  }

  init() {
    if(this.action == 'add') {
      this.translate.get('INSURANCE_REV.NEW_MORTGAGE_LOAN', {}).subscribe((res: string) => {
        this.title = res;
      });
    } else {
      this.translate.get('INSURANCE_REV.EDIT_MORTGAGE_LOAN', {}).subscribe((res: string) => {
        this.title = res;
      });
      this.type = this.data.type;
      this.insurance = !this.data.insurance ? '0' : this.data.insurance;
      this.amount = this.data.amount;
      this.duration = this.data.duration;
      this.monthly = this.data.monthly;
      this.institution = this.data.institution;
      this.year = this.data.renewal_date.split('-')[0];
      this.setMonth(this.data.renewal_date.split('-')[1]);
      this.day = this.data.renewal_date.split('-')[2];
      this.borrower = JSON.stringify(this.data.titulaire);
      this.borrower = this.borrower.replace(/\\/g, '');
      this.borrower = this.borrower.replace(/['"]+/g, '');
      this.borrower = this.borrower.replace(",]", ']');
      this.borrower = JSON.parse(this.borrower);
      let newBorrowerArr = [];
      _.forEach(this.borrower, function(e) {
        newBorrowerArr.push(e.toString());
      })
      this.borrower = newBorrowerArr;
    }
    this.days = this.appGlobal.getDays(this.year, this.month);
    this.getContacts();
  }

  setMonth(month) {
    const mString = this.appGlobal.months[Number(month) - 1];
    this.month = mString;
  }

  getContacts() {
    var that  = this;
    this.borrowers.push({
      id: this.userService.mainData.id,
      fullname: this.userService.mainData.firstname + ' ' + this.userService.mainData.lastname
    });
    if(this.userService.coapplicantData.firstname == undefined || this.userService.coapplicantData.lastname == undefined) {}
    else
      this.borrowers.push({
        id: this.userService.coapplicantData.id,
        fullname: this.userService.coapplicantData.firstname + ' ' + this.userService.coapplicantData.lastname
      });
    _.forEach(this.userService.otherData, function(obj) {
      if(obj.firstname == undefined || obj.lastname == undefined) {}
      else
        that.borrowers.push({
          id: obj.id,
          fullname: obj.firstname + ' ' + obj.lastname
        });
    });
  }

  onChangeMonth() {
    this.days = this.appGlobal.getDays(this.year, this.month);
    if(this.day > this.days.length) this.day = '';
  }

  close() {
    this.modalCtrl.dismiss();
  }

  saveClick() {
    this.actionBtnAttempt = true;
    if(!this.formGroup.get('amount').hasError('required') && !this.formGroup.get('monthly').hasError('required') && !this.formGroup.get('borrower').hasError('required')) {
      this.save();
    }
  }

  save() {
    this.data.type = this.type;
    this.data.institution = this.institution;
    this.data.insurance = this.insurance;
    this.data.amount = this.amount;
    this.data.duration = this.duration;
    let mm: string;
    if(this.day && this.month && this.year) {
      var that  = this;
      mm = _.findIndex(this.appGlobal.months, function(m: any) { return m == that.month }) + 1;
      mm = String(mm).padStart(2, '0');
      this.data.renewal_date = this.year + '-' + mm + '-' + this.day;
    }
    this.data.monthly = this.monthly;
    this.data.titulaire = this.borrower;
    if(this.action == 'edit') {
      this.uiUtility.showLoader();
      this.apiService.patch('/client/fna/' + this.userService.fnaId +'/mortgage/' + this.data.id, this.data)
        .subscribe((res) => {
          this.userService.setAccessToken(res);
          this.uiUtility.hideLoader();
          this.close();
        },
        (e) => {
          this.close();
        });
    } else {
      if(this.data.type && this.data.institution && this.data.insurance && this.data.amount && this.data.duration && this.data.renewal_date && this.data.monthly && this.data.titulaire) {
        this.data.abf_id = this.userService.fnaId; 
          this.uiUtility.showLoader();
          this.apiService.post('/client/fna/' + this.userService.fnaId +'/mortgage', this.data, { observe: 'response' })
            .then((res: any) => {
              this.userService.setAccessToken(res);
              this.userService.mortgageData.push(res.body.data);
              this.uiUtility.hideLoader();
              this.close();
            })
            .catch((e: any) => { 
              this.close();
            });  
      }
    }
  }

  openLoanTypeSelect() {
    this.loanTypeSelect.open();
  }

  openPercentSelect() {
    this.percentSelect.open();
  }

  openBorrowersSelect() {
    this.borrowersSelect.open();
  }

  openMonthSelect() {
    this.monthSelect.open();
  }

  openDaySelect() {
    this.daySelect.open();
  }

  openYearSelect() {
    this.yearSelect.open();
  }

}
