import { Component, NgZone, OnInit } from '@angular/core';
import { NavController, ModalController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration/ngx';
import { TouchID } from '@ionic-native/touch-id/ngx';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';

import { TouchidPage } from '../touchid/touchid.page';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { AppGlobals } from '../../shared/app.globals';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user/user.service';

import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'page-passcode',
  templateUrl: './passcode.page.html',
  styleUrls: ['./passcode.page.scss'],
})
export class PasscodePage implements OnInit {
  public selectedIndexArr: Array<any> = [];
  public selectedIndexArrBackup: Array<any> = [];
  public isPasscode: boolean;
  progressElm: HTMLElement;
  private passcodeObj: {};
  public touchIdAvailable: boolean = false;
  public subscription: Subscription;

  constructor(public navCtrl: NavController,
    private storage: Storage,
    public uiUtility: UiUtilsService,
    private vibration: Vibration,
    public appGlobalService: AppGlobals,
    private modalCtrl: ModalController,
    private userService: UserService,
    public translate: TranslateService,
    private zone: NgZone,
    private touchId: TouchID,
    private platform: Platform,
    private androidFingerprintAuth: AndroidFingerprintAuth
  ) {
    this.init();
    this.checkPasscode();
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999,  () => {
      console.log('Hardware back button disabled');
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  
  init() {
    this.touchId.isAvailable()
      .then(res => {
        this.touchIdAvailable = true;
      })
      .catch(e => { console.log(e); });

    this.androidFingerprintAuth.isAvailable()
      .then(res => {
        if(res.isAvailable) {
          this.touchIdAvailable = true;
        }
      })
      .catch(e => { console.log(e); })
  }

  checkPasscode() {
    this.zone.run(() => {
      this.storage.get('passcodeObj')
        .then(res => {
          if(res) {
            this.passcodeObj = JSON.parse(res);
            if(this.passcodeObj[this.userService.userID])
              this.isPasscode = true;
            else
              this.isPasscode = false;
          } else {
            this.passcodeObj = {};
            this.isPasscode = false;
          }
        })
        .catch(e => { console.log(e); });
    });
  }

  shakeAction(flag) {
    this.zone.run(() => {
      this.progressElm = <HTMLElement>document.querySelector('#progress-area');
      let progressAreaEle = document.querySelectorAll('.progress-round');
      this.progressElm.classList.add('shake-action');
      _.forEach(progressAreaEle, function(v) {
        v.classList.add('progress-filled-invalid');
      });
      setTimeout(() => {
        this.progressElm.classList.remove('shake-action');
        _.forEach(progressAreaEle, function(v) {
          v.classList.remove('progress-filled-invalid');
        });
        this.selectedIndexArr = [];
        if(!flag) {
          this.selectedIndexArrBackup = [];
        }
      }, 1000);
    });
  }

  roundTouchStart(index) {
    let roundElm = <HTMLElement>document.querySelector('#touch-round-' +  index);
    roundElm.classList.add('touch-round-activated');
    roundElm.classList.remove('touch-round-deactivated');

    if(index == 0 || index == 1 || index == 2 || index == 3 || index == 4 || index == 5 || index == 6 || index == 7 || index == 8 || index == 9) {
      this.zone.run(() => {
        if(this.selectedIndexArr.length < 4) {
          this.selectedIndexArr.push(index);
        }
        if(this.selectedIndexArr.length == 4) {
          const passcodeStr = _.map(this.selectedIndexArr).join('');
          if(!this.isPasscode && !this.selectedIndexArrBackup.length) {
            this.selectedIndexArrBackup = this.selectedIndexArr;
            this.selectedIndexArr = [];
          } else if(!this.isPasscode && this.selectedIndexArrBackup.length) {
            if(_.isEqual(this.selectedIndexArr, this.selectedIndexArrBackup)) {
              this.passcodeObj[this.userService.userID] = passcodeStr;
              this.storage.set('passcodeObj', JSON.stringify(this.passcodeObj));
  
              this.modalCtrl.dismiss();
              this.appGlobalService.unLocked = true;
              this.appGlobalService.isOpenModal = false;
            } else {
              this.translate.get('PASSCODE.PASSCODE_CONFIRM_NOT_MATCH', {}).subscribe((res: string) => {
                this.uiUtility.toastMsg(res);
              });
              this.shakeAction(false);
              this.vibration.vibrate(1000);
            }
          } else if(this.isPasscode) {
            if(this.passcodeObj[this.userService.userID] == passcodeStr) {
              this.modalCtrl.dismiss().then((res) => {
                this.appGlobalService.unLocked = true;
                this.appGlobalService.isOpenModal = false;
              });
            } else {
              this.shakeAction(true);
              this.translate.get('PASSCODE.PASSCODE_DOES_NOT_MATCH', {}).subscribe((res: string) => {
                this.uiUtility.toastMsg(res);
              });
              this.vibration.vibrate(1000);
            }
          }
        }
      });
    }
  }

  roundTouchEnd(index) {
    let roundElm = <HTMLElement>document.querySelector('#touch-round-' +  index);
    roundElm.classList.add('touch-round-deactivated');
    roundElm.classList.remove('touch-round-activated');
  }

  delCharacter() {
    this.zone.run(() => {
      this.selectedIndexArr.pop();
    });
  }

  goToTouchIdPage() {
    this.modalCtrl.dismiss();
    this.modalCtrl.create({component: TouchidPage, componentProps: {}})
      .then((modal) => {
        modal.present();
        modal.onWillDismiss().then(res => {
          // this.navCtrl.navigateRoot('/tabs');
        });
      });
  }
}
