import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, IonSelect, ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AppGlobals } from '../../shared/app.globals';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user/user.service';
import { ApiService } from '../../services/api/api.service';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as _ from 'lodash';

export class PhoneNumberValidator {
  static validPhoneNumber(fc: FormControl){
    let val = fc.value;
    if(val == undefined) val = '';
    let isInValid = /[A-Za-z]/.test( val )
    if(isInValid) {
      return ({validPhoneNumber: true});
    } else {
      return (null);
    }
  }
}

@Component({
  selector: 'page-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  formGroup: FormGroup;
  @ViewChild('monthSelect') monthSelect: IonSelect;
  @ViewChild('daySelect') daySelect: IonSelect;
  @ViewChild('yearSelect') yearSelect: IonSelect;
  @ViewChild('householdSelect') householdSelect: IonSelect;
  @ViewChild('smokerSelect') smokerSelect: IonSelect;
  public type: string;
  public action: string;
  public title: string;
  public cameraImageUrl: any = '';
  public data: any;
  public smoker: string;
  public month: string;
  public year: string;
  public day: string;
  public years: any;
  public months: any;
  public days: any;
  public relationship: string;
  public actionBtnAttempt: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    public appGlobal: AppGlobals,
    private camera: Camera,
    private translate: TranslateService,
    private userService: UserService,
    private apiService: ApiService,
    private uiUtility: UiUtilsService
  ) {
    this.type = this.navParams.get('type');
    this.action = this.navParams.get('action');
    this.data = this.navParams.get('data');
    this.years = appGlobal.years;
    this.months = appGlobal.months;
    this.days = this.appGlobal.getDays(this.year, this.month);

    if(this.action == 'new') {
      this.translate.get('GENERIC.NEW_FEM', {}).subscribe((res: string) => {
        this.title = res;
        this.translate.get('GENERIC.PERSON', {}).subscribe((res: string) => {
          this.title = this.title + ' ' +  res;
        });
      });
    } else {
      if(this.type == 'general') {
        this.translate.get('INSURANCE_REV.GENERAL_INFORMATION_SECTION_TITLE', {}).subscribe((res: string) => {
          this.title = res;
        });
      }
      if(this.type == 'household') {
        this.translate.get('GENERIC.EDIT', {}).subscribe((res: string) => {
          this.title = res;
          this.translate.get('GENERIC.PERSON', {}).subscribe((res: string) => {
            this.title = this.title + ' ' +  res;
          });
        });
      }
      this.smoker = (this.data.smoker).toString();
      this.year = this.data.dob.split('-')[0];

      this.setMonth(this.data.dob.split('-')[1]);

      this.day = this.data.dob.split('-')[2];
      if(this.data.role == 'other' && this.data.sex == 'male')
        this.relationship = 'son';
      if(this.data.role == 'other' && this.data.sex == 'female')
        this.relationship = 'daughter';
      if(this.data.role == 'coapplicant')
        this.relationship = 'spouse';
    }
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      firstname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      address: new FormControl('', Validators.compose([

      ])),
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ])),
      mainphone: new FormControl('', Validators.compose([
        PhoneNumberValidator.validPhoneNumber,
        Validators.required
      ])),
      smoker: new FormControl('', Validators.compose([

      ])),
      relationship: new FormControl('', Validators.compose([
        Validators.required
      ])),
      day: new FormControl('', Validators.compose([
        Validators.required
      ])),
      month: new FormControl('', Validators.compose([
        Validators.required
      ])),
      year: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  ionViewWillLeave() {
    this.appGlobal.preventPauseEV_1 = false;
    this.appGlobal.preventPauseEV_2 = false;
    this.appGlobal.preventPauseEV_3 = false;
    this.appGlobal.preventPauseEV_4 = false;
  }

  setMonth(month) {
    const mString = this.appGlobal.months[Number(month) - 1];
    this.month = mString;
    this.days = this.appGlobal.getDays(this.year, this.month);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  clickSave() {
    this.actionBtnAttempt = true;
    if(this.type == 'general') {
      if(this.formGroup.get('firstname').value && this.formGroup.get('lastname').value && this.formGroup.get('email').value && this.formGroup.get('mainphone').value && !this.formGroup.get('email').hasError('email') && !this.formGroup.get('mainphone').hasError('validPhoneNumber')) {
        this.save(this.formGroup.get('firstname').value, this.formGroup.get('lastname').value, this.formGroup.get('email').value, this.formGroup.get('mainphone').value, '', '', '', this.smoker, this.data.address, '');
      }
    } else {
      if(this.data.role != 'other' && this.data.role != undefined) {
        if(this.formGroup.get('firstname').value && this.formGroup.get('lastname').value && this.formGroup.get('email').value && this.formGroup.get('day').value && this.formGroup.get('month').value && this.formGroup.get('year').value && this.formGroup.get('relationship').value && !this.formGroup.get('email').hasError('email')) {
          this.save(this.formGroup.get('firstname').value, this.formGroup.get('lastname').value, this.formGroup.get('email').value, '', this.formGroup.get('day').value, this.formGroup.get('month').value, this.formGroup.get('year').value, '', '', this.relationship);
        }
      } else {
        if(this.formGroup.get('firstname').value && this.formGroup.get('lastname').value && this.formGroup.get('day').value && this.formGroup.get('month').value && this.formGroup.get('year').value && this.formGroup.get('relationship').value) {
          this.save(this.formGroup.get('firstname').value, this.formGroup.get('lastname').value, '', '', this.formGroup.get('day').value, this.formGroup.get('month').value, this.formGroup.get('year').value, '', '', this.relationship);
        }
      }
    }
  }

  save(firstName: string, lastName: string, email: string, mainPhone: string, day: string, month: string, year: string, smoker: string, address: string, relationShip: string) {
    if(this.action == 'edit') {
      if(firstName)
        this.data.firstname = firstName;
      if(lastName)
        this.data.lastname = lastName;
      if(email)
        this.data.email = email;
      if(mainPhone)
        this.data.mainphone = mainPhone;
      if(day && month && year) {
        month = _.findIndex(this.appGlobal.months, function(m: any) { return m == month }) + 1;
        month = String(month).padStart(2, '0');
        this.data.dob = year + '-' + month + '-' + day;
      }
      if(smoker)
        this.data.smoker = smoker == 'true' ? true : false;
      if(address)
        this.data.address = address;
        this.uiUtility.showLoader();
        this.apiService.patch('/client/fna/' + this.userService.fnaId +'/contact/' + this.data.id, this.data)
          .subscribe((res) => {
            this.userService.setAccessToken(res);
            if(this.cameraImageUrl) {
              this.uploadPhoto(this.cameraImageUrl, this.data.id);
            } else {
              this.uiUtility.hideLoader();
              this.close();
            }
          },
          (e) => {
            this.close();
          });
    } else {
      month = _.findIndex(this.appGlobal.months, function(m: any) { return m == month }) + 1;
      month = String(month).padStart(2, '0');
      let payload = {firstname: firstName, lastname: lastName, email: email, dob: year + '-' + month + '-' + day, lead_id: this.userService.leadId, abf_id: this.userService.fnaId};
      if(this.relationship == 'son') {
        payload['sex'] = 'male';
        payload['role'] = 'other';
      }
      if(this.relationship == 'daughter') {
        payload['sex'] = 'female';
        payload['role'] = 'other';
      }
      if(this.relationship == 'spouse') {
        payload['sex'] = 'female';
        payload['role'] = 'coapplicant';
        payload['cellphone'] = '(514) 236-1889';
        if(this.userService.coapplicantData.hasOwnProperty('id')) {
          this.translate.get('INSURANCE_REV.COAP_ADD_WARNNING', {}).subscribe((res: string) => {
            this.uiUtility.toastMsg(res);
          });
          return false;
        }
      }
      this.uiUtility.showLoader();
      this.apiService.post('/client/fna/' + this.userService.fnaId + '/contact', payload, { observe: 'response' })
        .then(res => {
          this.userService.setAccessToken(res);
          let coapRes = res.body.data;
          if(coapRes.role == 'other') {
            this.userService.otherData.push(coapRes);
          } else if(coapRes.role == 'coapplicant') {
            coapRes['details'] = {};
            coapRes['details']['data'] = {};
            coapRes['asset'] = {};
            coapRes['asset']['data'] = {};
            coapRes['liability'] = {};
            coapRes['liability']['data'] = {};
            this.userService.coapplicantData = coapRes;

          }
          if(this.cameraImageUrl) {
            this.uploadPhoto(this.cameraImageUrl, coapRes.id);
          } else {
            this.uiUtility.hideLoader();
            this.close();
          }
        })
        .catch((e: any) => { 
          this.close();
        });
    }
  }

  onChangeMonth() {
    this.days = this.appGlobal.getDays(this.year, this.month);
    if(this.day > this.days.length) this.day = '';
  }

  openMonthSelect() {
    this.monthSelect.open();
  }

  openDaySelect() {
    this.daySelect.open();
  }

  openYearSelect() {
    this.daySelect.open();
  }

  openHouseholdSelect() {
    this.householdSelect.open();
  }

  openSmokerSelect() {
    this.smokerSelect.open();
  }

  async presentActionSheet() {
    let actionSheetTitle: string, cameraTxt: string, libraryTxt: string;
    this.translate.get('GENERIC.PROFILE_PICTURE', {}).subscribe((res: string) => {
      actionSheetTitle = res;
    });
    this.translate.get('GENERIC.TAKE_PHOTO_CAMERA', {}).subscribe((res: string) => {
      cameraTxt = res;
    });
    this.translate.get('GENERIC.TAKE_PHOTO_LIBRARY', {}).subscribe((res: string) => {
      libraryTxt = res;
    });

    const actionSheet = await this.actionSheetController.create({
      header: actionSheetTitle,
      buttons: [{
        text: cameraTxt,
        handler: () => {
          this.takePhoto('camera');
        }
      }, {
        text: libraryTxt,
        handler: () => {
          this.takePhoto('library');
        }
      }]
    });
    await actionSheet.present();
  }

  takePhoto(type: string) {
    this.appGlobal.preventPauseEV_4 = true;
    setTimeout(() => {
      this.appGlobal.preventPauseEV_1 = false;
      this.appGlobal.preventPauseEV_2 = false;
      this.appGlobal.preventPauseEV_3 = false;
      this.appGlobal.preventPauseEV_4 = false;
    }, 30000);

    let sourceType: any;
    if(type == 'camera') {
      sourceType = this.camera.PictureSourceType.CAMERA;
    } else {
      sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    }

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      targetWidth: 900,
      targetHeight: 900,
      allowEdit: true,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/png;base64,' + imageData;
      this.cameraImageUrl = base64Image;
     }, (err) => {
      console.log(JSON.stringify(err));
     });
  }

  uploadPhoto(imageData, updateId) {
    this.apiService.post('/client/picture/' + updateId + '/fna', {file_encoded: imageData}, { observe: 'response' })
      .then((res: any) => {
        this.userService.setAccessToken(res);
        if(res.body.data.role == 'main') {
          this.userService.mainData.image = res.body.data.image;
        } else if(res.body.data.role == 'coapplicant') {
            this.userService.coapplicantData.image = res.body.data.image;
        } else {
          _.forEach(this.userService.otherData, function(otherdata) {
            if(otherdata.id == res.body.data.id) {
              otherdata.image = res.body.data.image;
            }
          });
        }
        this.uiUtility.hideLoader();
        this.close();
      })
      .catch((e: any) => {});
  }

  disAllowNum(val: any, field: string) {
    if ( /[0-9]/.test( val ) ) {
      setTimeout(() => {
        this.data[field] = this.data[field].slice(0, -1);
      });
    }
  }

  disAllowChar(val: any, field: string) {
    if ( /[A-Za-z]/.test( val ) ) {
      setTimeout(() => {
        this.data[field] = this.data[field].slice(0, -1);
      });
    }
  }
}
