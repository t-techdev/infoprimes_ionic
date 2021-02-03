import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, IonSlides, ModalController } from '@ionic/angular';

import { ProfileEditPage } from '../profile-edit/profile-edit.page';
import { MortgageLoanEditPage } from '../mortgage-loan-edit/mortgage-loan-edit.page';
import { InsuranceInvestEditPage } from '../insurance-invest-edit/insurance-invest-edit.page';
import { AssetsEditPage } from '../assets-edit/assets-edit.page';
import { ProfessionEditPage } from '../profession-edit/profession-edit.page';
import { LiabilitiesEditPage } from '../liabilities-edit/liabilities-edit.page';
import { AppGlobals } from '../../shared/app.globals';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { ApiService } from '../../services/api/api.service';
import { UserService } from '../../services/user/user.service';
import { TranslateService } from '@ngx-translate/core';

import * as _ from 'lodash';

@Component({
  selector: 'page-profile-review',
  templateUrl: './profile-review.page.html',
  styleUrls: ['./profile-review.page.scss'],
})
export class ProfileReviewPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  public slideNum: any = 0;
  public isClickedMainPro: boolean = false;
  public isClickedCoapplicantPro: boolean = false;
  public isClickedMainAssets: boolean = true;
  public isClickedCoapplicantAssets: boolean = false;
  public liabilitiesClickedItems: Object = {
    main_loan: false,
    main_commercial: false,
    main_lease: false,
    main_creditcard: false,
    main_other: false,
    other_loan: false,
    other_commercial: false,
    other_lease: false,
    other_creditcard: false,
    other_other: false
  };
  public slideIndexArr: any;
  public item: any = {};
  public mainData: any;
  public mainAssetData: any;
  public coAssetData: any;
  public otherData: any;
  public coapplicantData: any;
  public mortgageData: any;
  public externalData: any;
  public curHouseholdItem: any = {};
  public curMortgagesItem: any = {};
  public curExternalItem: any = {};
  public mainAssetsTotal: any;
  public coapplicantAssetsTotal: any;
  public editAssetIndex: number;
  public allData: any;

  sliderConfig = {
    slidesPerView: 1.06,
    spaceBetween: -10.5,
    centeredSlides: true,
    zoom: false
  };

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public apiService: ApiService,
    public userService: UserService,
    private _elementRef : ElementRef,
    public translate: TranslateService,
    private appGlobal: AppGlobals,
    public uiUtility: UiUtilsService
  ) {
    this.item.liabilitiesArrowIcon = 'arrow-down';
    this.slideIndexArr = [7, 8, 9, 10, 11, 12];
  }

  ngOnInit() {
    this.slides.lockSwipes(true);
    //this.keyboard.hideKeyboardAccessoryBar(false);

    this.uiUtility.showLoader();
    this.apiService.get('/client/data/' + this.userService.leadId + '/fork', '')
      .subscribe((res) => {
        this.userService.setAccessToken(res);
        this.userService.fnaId = res.body.data.id;
        let params = {
          include: 'main,main.asset,main.liability,coap,coap.asset,coap.liability,others,mortgages,external,main.details,coap.details'
        };
        this.apiService.get('/client/data/' + this.userService.leadId +'/fna', params)
          .subscribe((res) => {
            this.uiUtility.hideLoader();
            this.userService.setAccessToken(res);
            this.userService.mainData = res.body.data.main.data;
            this.userService.coapplicantData = res.body.data.hasOwnProperty('coap') ? res.body.data.coap.data : '';
            this.userService.otherData = res.body.data.hasOwnProperty('others') ? res.body.data.others.data : '';
            this.userService.mortgageData = res.body.data.hasOwnProperty('mortgages') ? res.body.data.mortgages.data : '';
            this.userService.externalData = res.body.data.hasOwnProperty('external') ? res.body.data.external.data : '';  
            
            this.getData();
            this.mainAssetData = [];
            this.coAssetData = [];
          },
          (e) => {});
      },
      (e) => {});
  }

  ngAfterViewInit() {
    /*
    this.slides.centeredSlides = true;
    this.slides.slidesPerView = 1.06;
    this.slides.spaceBetween = -10;
    */
  }

  setAssetData(category, data) {
    const array = [
      {
        label: 'INSURANCE_REV.MONEY_IN_DA_BANK',
        key: 'base',
        price: data.base
      },
      {
        label: 'INSURANCE_REV.FIXED_TERM_DEPOSIT',
        key: 'term_deposit',
        price: data.term_deposit
      },
      {
        label: 'INSURANCE_REV.NON_REGISTERED_INVESTMENTS',
        key: 'unregistered',
        price: data.unregistered
      },
      {
        label: 'INSURANCE_REV.TFSA',
        key: 'celi',
        price: data.celi
      },
      {
        label: 'INSURANCE_REV.RRSP',
        key: 'reer',
        price: data.reer
      },
      {
        label: 'INSURANCE_REV.RRSP_LIRA',
        key: 'reer_cri',
        price: data.reer_cri
      },
      {
        label: 'INSURANCE_REV.RRIF_LIF',
        key: 'ferr',
        price: data.ferr
      },
      {
        label: 'INSURANCE_REV.RESP',
        key: 'reee',
        price: data.reee
      },
      {
        label: 'INSURANCE_REV.PENSION_FUND',
        key: 'pension',
        price: data.pension
      },
      {
        label: 'INSURANCE_REV.OUTSIDE_INDIVIDUAL_LIFE',
        key: 'individual_life_other',
        price: data.individual_life_other
      },
      {
        label: 'INSURANCE_REV.OUTSIDE_GROUP_LIFE',
        key: 'collective_life_other',
        price: data.collective_life_other
      },
      {
        label: 'INSURANCE_REV.SECOND_VEHICLE',
        key: 'vehicle',
        price: data.vehicle
      },
      {
        label: 'INSURANCE_REV.TOOLS_COLLECTIONS',
        key: 'tools',
        price: data.tools
      },
      {
        label: 'INSURANCE_REV.LAND',
        key: 'land',
        price: data.land
      },
      {
        label: 'INSURANCE_REV.CABINS',
        key: 'cottage',
        price: data.cottage
      },
      {
        label: 'INSURANCE_REV.BUILDINGS',
        key: 'real_state',
        price: data.real_state
      },
      {
        label: 'INSURANCE_REV.OTHER',
        key: 'others',
        price: data.others
      },
    ]
    if(category === 'main') {
      this.mainAssetData = array;
    } else {
      this.coAssetData = array;
    }
  }

  getData() {
    /** Insurance_Review__MAIN_CONTACT_DATA_.js */
    this.mainData = this.userService.mainData;
    this.mainAssetData = this.mainData.asset.data;
    this.setAssetData('main', this.mainAssetData);
    this.mainAssetsTotal = _.sum([this.mainData.asset.data.base, this.mainData.asset.data.term_deposit, this.mainData.asset.data.unregistered, this.mainData.asset.data.celi, this.mainData.asset.data.reer, this.mainData.asset.data.reer_cri, this.mainData.asset.data.ferr, this.mainData.asset.data.reee, this.mainData.asset.data.pension, this.mainData.asset.data.individual_life_other, this.mainData.asset.data.collective_life_other, this.mainData.asset.data.vehicle, this.mainData.asset.data.tools, this.mainData.asset.data.land, this.mainData.asset.data.cottage, this.mainData.asset.data.real_state, this.mainData.asset.data.others]);

    /** Coapplicant_Insurance_review_data.js */
    this.coapplicantData = this.userService.coapplicantData;
    this.coAssetData = this.coapplicantData.hasOwnProperty('id') ? this.coapplicantData.asset.data : {};
    this.setAssetData('co', this.coAssetData);
    this.coapplicantAssetsTotal = _.sum([
      this.coapplicantData.hasOwnProperty('id') ? this.coapplicantData.asset.data.base : 0, 
      this.coapplicantData.hasOwnProperty('id') ? this.coapplicantData.asset.data.term_deposit : 0, 
      this.coapplicantData.hasOwnProperty('id') ? this.coapplicantData.asset.data.unregistered : 0, 
      this.coapplicantData.hasOwnProperty('id') ? this.coapplicantData.asset.data.celi : 0, 
      this.coapplicantData.hasOwnProperty('id') ? this.coapplicantData.asset.data.reer : 0, 
      this.coapplicantData.hasOwnProperty('id') ? this.coapplicantData.asset.data.reer_cri : 0, 
      this.coapplicantData.hasOwnProperty('id') ? this.coapplicantData.asset.data.ferr : 0, 
      this.coapplicantData.hasOwnProperty('id') ? this.coapplicantData.asset.data.reee : 0, 
      this.coapplicantData.hasOwnProperty('id') ? this.coapplicantData.asset.data.pension : 0, 
      this.coapplicantData.hasOwnProperty('id') ? this.coapplicantData.asset.data.individual_life_other : 0, 
      this.coapplicantData.hasOwnProperty('id') ? this.coapplicantData.asset.data.collective_life_other : 0, 
      this.coapplicantData.hasOwnProperty('id') ? this.coapplicantData.asset.data.vehicle : 0, 
      this.coapplicantData.hasOwnProperty('id') ? this.coapplicantData.asset.data.tools : 0, 
      this.coapplicantData.hasOwnProperty('id') ? this.coapplicantData.asset.data.land : 0, 
      this.coapplicantData.hasOwnProperty('id') ? this.coapplicantData.asset.data.cottage : 0, 
      this.coapplicantData.hasOwnProperty('id') ? this.coapplicantData.asset.data.real_state : 0, 
      this.coapplicantData.hasOwnProperty('id') ? this.coapplicantData.asset.data.others : 0
    ]);

    /** Other_Insurance_review_Data.js */
    this.otherData = this.userService.otherData;

    /** Mortgages_DATA.js */
    this.mortgageData = this.userService.mortgageData;
    if(this.mortgageData.length > 0) this.curMortgagesItem = this.mortgageData[0]

    /** External_Insurance_Data.js */
    this.externalData = this.userService.externalData;
  }

  goBack() {
    this.navCtrl.back();
  }

  next() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    if(this.slideNum >= 6) {
      this.navCtrl.navigateForward('/confirmation', {animationDirection: 'forward'});
    }
  }

  previous() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  slideChanged() {
    this.slides.getActiveIndex()
      .then((res) => {
        this.slideNum = res;
        if(this.slideNum == 6) {
          this.slides.lockSwipeToNext(true);
        } else {
          this.slides.lockSwipeToNext(false);
        }
        this.getSlideIndexArr(this.slideNum + 1);
      });
  }

  householdItemClick(item: any) {
    if(this.curHouseholdItem.id == item.id) {
      this.curHouseholdItem = {};
    } else {
      this.curHouseholdItem = item;
    }
  }

  professionItemClick(type: string) {
    if(type == 'main') {
      this.isClickedMainPro = !this.isClickedMainPro;
      if(this.isClickedMainPro) this.isClickedCoapplicantPro = false
    } else {
      this.isClickedCoapplicantPro = !this.isClickedCoapplicantPro;
      if(this.isClickedCoapplicantPro) this.isClickedMainPro = false
    }
  }

  mortgageLoanItemClick(item: any) {
    if(this.curMortgagesItem.id == item.id) {
      this.curMortgagesItem = {};
    } else {
      this.curMortgagesItem = item;
    }
  }

  liabilitiesItemClick(cate: string) {
    const temp = this.liabilitiesClickedItems[cate];
    this.liabilitiesClickedItems = {
      main_loan: false,
      main_commercial: false,
      main_lease: false,
      main_creditcard: false,
      main_other: false,
      other_loan: false,
      other_commercial: false,
      other_lease: false,
      other_creditcard: false,
      other_other: false
    };
    this.liabilitiesClickedItems[cate] = !temp;
  }

  externalItemClick(item: any) {
    if(this.curExternalItem.id == item.id) {
      this.curExternalItem = {};
    } else {
      this.curExternalItem = item;
    }
  }

  assetsItemClick(type: string) {
    if(type == 'main') {
      this.isClickedMainAssets = !this.isClickedMainAssets;
      if(this.isClickedMainAssets) this.isClickedCoapplicantAssets = false;
    } else {
      this.isClickedCoapplicantAssets = !this.isClickedCoapplicantAssets;
      if(this.isClickedCoapplicantAssets) this.isClickedMainAssets = false;
    }
  }

  goProfileEdit(type: string, action: string, data: any) {
    this.modalCtrl.create({component: ProfileEditPage, componentProps: {type: type, action: action, data: data}})
      .then((modal) => {
        modal.present().then();
      });
  }

  goMortgageLoanEdit(action: string, data: Object) {
    this.modalCtrl.create({component: MortgageLoanEditPage, componentProps: {action: action, data: data}})
      .then((modal) => {
        modal.present().then();
      });
  }

  goInsuranceInvestEdit(action: string, data: any) {
    this.modalCtrl.create({component: InsuranceInvestEditPage, componentProps: {action: action, data: data}})
      .then((modal) => {
        modal.present().then();
      });
  }

  onChange(category, option, event) {
    
  }

  toggleToCoAssets() {
    this.isClickedMainAssets = false;
    this.isClickedCoapplicantAssets = true;
    this._elementRef.nativeElement.querySelector('.assets-card').scrollTop = 0;
  }

  toggleToMainAssets() {
    this.isClickedMainAssets = true;
    this.isClickedCoapplicantAssets = false;
    this._elementRef.nativeElement.querySelector('.assets-card').scrollTop = 0;
  }

  goAssetsEdit(action: string, data: Object) {
    this.modalCtrl.create({component: AssetsEditPage, componentProps: {action: action, data: data}})
      .then((modal) => {
        modal.present().then();
      });
  }

  goProfessionEdit(data: any) {
    this.modalCtrl.create({component: ProfessionEditPage, componentProps: {data: data}})
      .then((modal) => {
        modal.present().then();
      });
  }

  openLiabilitiesEdit(data: any, type: string, index: number) {
    this.modalCtrl.create({component: LiabilitiesEditPage, componentProps: {data: data, type: type, index: index}})
      .then((modal) => {
        modal.present().then();
      });
  }

  getSlideIndexArr(index: any) {
    let startIndex = 8 - index;
    this.slideIndexArr = [];
    for(let i = 0; i < 6; i++) {
      this.slideIndexArr.push(startIndex + i);
    }
  }

  isInSlideIndexArr(index) {
    return _.includes(this.slideIndexArr, index);
  }

  getBorrowwers(data: any) {
    let titulaire = JSON.stringify(data.titulaire);
    titulaire = titulaire.replace(/\\/g, '');
    titulaire = titulaire.replace(/['"]+/g, '');
    titulaire = titulaire.replace(",]", ']');
    titulaire = JSON.parse(titulaire);
    let nameStr = '';
    if(this.mainData.id == titulaire[0] || this.mainData.id == titulaire[1]) {
      nameStr = this.mainData.firstname + ' ' + this.mainData.lastname;
    }
    if(titulaire[1] != undefined && (this.coapplicantData.id == titulaire[0] || this.coapplicantData.id == titulaire[1])) {
      nameStr = nameStr + ', ' + this.coapplicantData.firstname + ' ' + this.coapplicantData.lastname;
    }
    return nameStr;
  }

  getInsuredLength(insured: string) {
    insured = JSON.stringify(insured);
    insured = insured.replace(/\\/g, '');
    insured = insured.replace(/['"]+/g, '');
    return JSON.parse(insured).length;
  }

  getExternalInsuranceTypes(type: string) {
    var typeStr;
    switch(type) {
      case 'life':
        this.translate.get('GENERIC.LIFE', {}).subscribe((res: string) => {
          typeStr = res;
        });
      break;
      case 'disability':
        this.translate.get('GENERIC.DISABILITY', {}).subscribe((res: string) => {
          typeStr = res;
        });
      break;
      case 'critical':
        this.translate.get('GENERIC.CRITICAL', {}).subscribe((res: string) => {
          typeStr = res;
        });
      break;
      case 'mortgage':
        this.translate.get('GENERIC.MORTGAGE', {}).subscribe((res: string) => {
          typeStr = res;
        });
      break;
      case 'collective-life':
        this.translate.get('GENERIC.COLLECTIVE', {}).subscribe((res: string) => {
          var firsWord = res;
          this.translate.get('GENERIC.LIFE', {}).subscribe((res: string) => {
            typeStr = firsWord + ' - ' + res;
          });
        });
      break;
      case 'collective-critical':
        this.translate.get('GENERIC.COLLECTIVE', {}).subscribe((res: string) => {
          var firsWord = res;
          this.translate.get('GENERIC.CRITICAL', {}).subscribe((res: string) => {
            typeStr = firsWord + ' - ' + res;
          });
        });
      break;
      case 'collective-disability':
        this.translate.get('GENERIC.COLLECTIVE', {}).subscribe((res: string) => {
          var firsWord = res;
          this.translate.get('GENERIC.DISABILITY', {}).subscribe((res: string) => {
            typeStr = firsWord + ' - ' + res;
          });
        });
      break;
      case 'reee':
        this.translate.get('INSURANCE_REV.REEE', {}).subscribe((res: string) => {
          typeStr = res;
        });
      break;
      case 'reer':
        this.translate.get('INSURANCE_REV.RRSP', {}).subscribe((res: string) => {
          typeStr = res;
        });
      break;
      case 'celi':
        this.translate.get('INSURANCE_REV.TFSA', {}).subscribe((res: string) => {
          typeStr = res;
        });
      break;
      case 'investment':
        this.translate.get('INSURANCE_REV.INVESTMENT', {}).subscribe((res: string) => {
          typeStr = res;
        });
      break;
      default:

      break;
    }
    return typeStr;
  }

  deleteHouseholdBtnClick(data: any) {
    var that = this;
    let warningTxt: string;
    let confirmDelTxt: string;
    let noTxt: string;
    let yesTxt: string;
    this.translate.get('GENERIC.WARNING', {}).subscribe((res: string) => {
      warningTxt = res;
      this.translate.get('GENERIC.CONFIRM_DELETE', {}).subscribe((res: string) => {
        confirmDelTxt = res;
        this.translate.get('GENERIC.NO', {}).subscribe((res: string) => {
          noTxt = res;
          this.translate.get('GENERIC.YES', {}).subscribe((res: string) => {
            yesTxt = res;
            this.uiUtility.confirmAlertBox(warningTxt, confirmDelTxt, noTxt, yesTxt, function() {}, function() {
              that.deleteHousehold(data);
            });
          });
        });
      });
    });
  }

  deleteHousehold(data: any) {
    this.uiUtility.showLoader();
    this.apiService.delete('/client/fna/' + this.userService.fnaId +'/contact/' + data.id)
      .then(res => {
        if(data.role == 'other')
          _.remove(this.userService.otherData, function(obj: any) {
            return obj.id == data.id;
          });
        else {
          this.userService.coapplicantData = {};
        }
        this.userService.setAccessToken(res);
        this.uiUtility.hideLoader();
      })
      .catch(e => {});
  }

  deleteMortgagesBtnClick(data: any) {
    var that = this;
    let warningTxt: string;
    let confirmDelTxt: string;
    let noTxt: string;
    let yesTxt: string;
    this.translate.get('GENERIC.WARNING', {}).subscribe((res: string) => {
      warningTxt = res;
      this.translate.get('GENERIC.CONFIRM_DELETE', {}).subscribe((res: string) => {
        confirmDelTxt = res;
        this.translate.get('GENERIC.NO', {}).subscribe((res: string) => {
          noTxt = res;
          this.translate.get('GENERIC.YES', {}).subscribe((res: string) => {
            yesTxt = res;
            this.uiUtility.confirmAlertBox(warningTxt, confirmDelTxt, noTxt, yesTxt, function() {}, function() {
              that.deleteMortgage(data);
            });
          });
        });
      });
    });
  }

  deleteMortgage(data: any) {
    this.uiUtility.showLoader();
    this.apiService.delete('/client/fna/' + this.userService.fnaId +'/mortgage/' + data.id)
      .then(res => {
        _.remove(this.mortgageData, function(obj: any) {
          return obj.id == data.id;
        });
        
        this.userService.setAccessToken(res);
        this.uiUtility.hideLoader();
      })
      .catch(e => {});
  }

  deleteInvestBtnClick(data: any) {
    var that = this;
    let warningTxt: string;
    let confirmDelTxt: string;
    let noTxt: string;
    let yesTxt: string;
    this.translate.get('GENERIC.WARNING', {}).subscribe((res: string) => {
      warningTxt = res;
      this.translate.get('GENERIC.CONFIRM_DELETE', {}).subscribe((res: string) => {
        confirmDelTxt = res;
        this.translate.get('GENERIC.NO', {}).subscribe((res: string) => {
          noTxt = res;
          this.translate.get('GENERIC.YES', {}).subscribe((res: string) => {
            yesTxt = res;
            this.uiUtility.confirmAlertBox(warningTxt, confirmDelTxt, noTxt, yesTxt, function() {}, function() {
              that.deleteInvest(data);
            });
          });
        });
      });
    });
  }

  deleteInvest(data: any) {
    this.uiUtility.showLoader();
    this.apiService.delete('/client/fna/' + this.userService.fnaId +'/external/' + data.id)
      .then(res => {
        _.remove(this.externalData, function(obj: any) {
          return obj.id == data.id;
        });
        
        this.userService.setAccessToken(res);
        this.uiUtility.hideLoader();
      })
      .catch(e => {});
  }
}
