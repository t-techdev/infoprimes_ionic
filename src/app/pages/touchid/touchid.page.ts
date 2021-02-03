import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, Platform } from '@ionic/angular';

import { TouchID } from '@ionic-native/touch-id/ngx';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';
import { PasscodePage } from '../passcode/passcode.page';
import { AppGlobals } from '../../shared/app.globals';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-touchid',
  templateUrl: './touchid.page.html',
  styleUrls: ['./touchid.page.scss'],
})
export class TouchidPage implements OnInit {
  private backButtonUnregister: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private touchId: TouchID,
    public appGlobalService: AppGlobals,
    private modalCtrl: ModalController,
    public translate: TranslateService,
    private platform: Platform,
    private androidFingerprintAuth: AndroidFingerprintAuth,
  ) {
    // this.backButtonUnregister = platform.registerBackButtonAction(() => {});
  }

  ngOnInit() {
    /*
    if(this.navParams.get('resume')) {
    this.touchId.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel('Unloack InfoPrimes', '')
      .then(res => {
        this.modalCtrl.dismiss()
          .then(res => {
            this.appGlobalService.isOpenModal = false;
          });
      })
      .then(e => { console.log(e); });
    }
    */
  }

  ionViewDidEnter() {
    if(this.platform.is('ios')) {
      this.touchId.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel('Unloack InfoPrimes', '')
        .then(res => {
          this.modalCtrl.dismiss()
            .then(res => {
              this.appGlobalService.isOpenModal = false;
            });
        })
        .then(e => { console.log(e); });
    }
    if(this.platform.is('android')) {
      this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword', disableBackup: true })
        .then(res => {
          if (res.withFingerprint) {
            console.log('Successfully encrypted credentials.');
            console.log('Encrypted credentials: ' + res.token);
            this.modalCtrl.dismiss()
              .then(res => {
                this.appGlobalService.isOpenModal = false;
              });
          } else if (res.withBackup) {
            console.log('Successfully authenticated with backup password!');
            this.modalCtrl.dismiss()
              .then(res => {
                this.appGlobalService.isOpenModal = false;
              });
          } else console.log('Didn\'t authenticate!');
        })
        .catch(error => {
          if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
            console.log('Fingerprint authentication cancelled');
          } else console.error(error)
        });
    }
  }

  ionViewWillLeave() {
    this.backButtonUnregister();
  }

  openTouchID() {
    if(this.platform.is('ios')) {
      this.touchId.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel('Unloack InfoPrimes', '')
        .then(res => {
          this.appGlobalService.unLocked = true;
          this.modalCtrl.dismiss()
            .then(res => {
              this.appGlobalService.isOpenModal = false;
            });
        })
        .then(e => { console.log(e); });
    }
    if(this.platform.is('android')) {
      this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword', disableBackup: true })
        .then(res => {
          if (res.withFingerprint) {
            console.log('Successfully encrypted credentials.');
            console.log('Encrypted credentials: ' + res.token);
            this.appGlobalService.unLocked = true;
            this.modalCtrl.dismiss()
              .then(res => {
                this.appGlobalService.isOpenModal = false;
              });
          } else if (res.withBackup) {
            console.log('Successfully authenticated with backup password!');
            this.appGlobalService.unLocked = true;
            this.modalCtrl.dismiss()
              .then(res => {
                this.appGlobalService.isOpenModal = false;
              });
          } else console.log('Didn\'t authenticate!');
        })
        .catch(error => {
          if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
            console.log('Fingerprint authentication cancelled');
          } else console.error(error)
        });
    }
  }

  goPasscodePage() {
    this.modalCtrl.dismiss();
    this.modalCtrl.create({component: PasscodePage, componentProps: {}})
      .then((modal) => {
        modal.present();
        modal.onWillDismiss().then(res => {
          // this.navCtrl.navigateRoot('/tabs');
        });
        // this.navCtrl.remove(this.viewCtrl.index);
      });
  }
}
