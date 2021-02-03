import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AppGlobals } from '../../shared/app.globals';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { UserService } from '../../services/user/user.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'page-liabilities-edit',
  templateUrl: './liabilities-edit.page.html',
  styleUrls: ['./liabilities-edit.page.scss'],
})
export class LiabilitiesEditPage implements OnInit {
  formGroup: FormGroup;
  public data: any;
  public overallData: any;
  public type: string;
  public total: string;
  public monthly: string;
  public duration: string;
  public index: number;
  public title: string;
  public keyArray = ['', 'loan_monthly', 'commercial_loan_monthly', 'lease_monthly', 'credit_card_monthly', 'other_monthly'];
  public actionBtnAttempt: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appGlobal: AppGlobals,
    private translate: TranslateService,
    public modalCtrl: ModalController,
    public uiUtility: UiUtilsService,
    public userService: UserService,
    public apiService: ApiService
  ) {
    
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      total: new FormControl('', Validators.compose([
        Validators.required
      ])),
      monthly: new FormControl('', Validators.compose([
        Validators.required
      ])),
      duration: new FormControl('', Validators.compose([

      ]))
    });
    this.overallData    = this.navParams.get('data');
    this.data = this.navParams.get('data').liability.data;;
    this.type = this.navParams.get('type');
    this.index = this.navParams.get('index');
    this.init();
  }

  init() {
    let typeStrArr = this.type.split('-');
    let field = typeStrArr[1];
    this.total = this.data[field];
    this.duration = this.data[field + '_duration'];
    this.translate.get(this.appGlobal.liability_types[this.index], {}).subscribe((res: string) => {
      this.title = res;
    });
    this.setMonthlyPayment(this.data, this.index);
  }

  setMonthlyPayment(data, index) {
    this.monthly = data[this.keyArray[index]];
  }

  close() {
    this.modalCtrl.dismiss();
  }

  saveClick() {
    this.actionBtnAttempt = true;
    if(!this.formGroup.get('total').hasError('required') && !this.formGroup.get('monthly').hasError('required')) {
      this.save();
    }
  }

  save() {
    let typeStrArr = this.type.split('-');
    let field = typeStrArr[1];
    this.overallData.liability.data[field] = this.total;
    this.overallData.liability.data[field + '_duration'] = this.duration;
    this.overallData.liability.data[this.keyArray[this.index]] = this.monthly;

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
