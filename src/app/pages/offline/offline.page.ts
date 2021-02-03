import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { Platform, ModalController, NavController } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { TouchID } from '@ionic-native/touch-id/ngx';
import { TouchidPage } from '../../pages/touchid/touchid.page';
import { PasscodePage } from '../../pages/passcode/passcode.page';
import { AppGlobals } from '../../shared/app.globals';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.page.html',
  styleUrls: ['./offline.page.scss'],
})
export class OfflinePage implements OnInit {

  constructor(
    public translate: TranslateService,
    private uiUtility: UiUtilsService,
    private modalCtrl: ModalController,
    public userService: UserService,
    private touchId: TouchID,
    private appGlobal: AppGlobals,
    public navCtrl: NavController,
    private platform: Platform,
    private androidFingerprintAuth: AndroidFingerprintAuth
  ) { }

  ngOnInit() {

  }

  tryAgain() {
    if(navigator.onLine) {
      this.modalCtrl.dismiss().then(res => {
        this.userService.isLeadIdChanged = true;
        if(this.platform.is('ios')) {
          this.touchId.isAvailable()
            .then(
              (res) => {
                this.modalCtrl.create({component: TouchidPage, componentProps: {}})
                  .then((modal) => {
                    modal.present().then(res => {
                      this.appGlobal.isOpenModal = true;
                    });
                    modal.onWillDismiss().then(res => {
                      this.navCtrl.navigateRoot('/tabs');
                    });
                  });
              },
              (err) => {
                this.modalCtrl.create({component: PasscodePage, componentProps: {}})
                  .then((modal) => {
                    modal.present().then(res => {
                      this.appGlobal.isOpenModal = true;
                    });
                    modal.onWillDismiss().then(res => {
                      this.navCtrl.navigateRoot('/tabs');
                    });
                  });
              }
            );
        }
        if(this.platform.is('android')) {
          this.androidFingerprintAuth.isAvailable()
            .then(res => {
              if(res.isAvailable) {
                this.modalCtrl.create({component: TouchidPage, componentProps: {}})
                  .then((modal) => {
                    modal.present().then(res => {
                      this.appGlobal.isOpenModal = true;
                    });
                    modal.onWillDismiss().then(res => {
                      this.navCtrl.navigateRoot('/tabs');
                    });
                  });
              } else {
                this.modalCtrl.create({component: PasscodePage, componentProps: {}})
                  .then((modal) => {
                    modal.present().then(res => {
                      this.appGlobal.isOpenModal = true;
                    });
                    modal.onWillDismiss().then(res => {
                      this.navCtrl.navigateRoot('/tabs');
                    });
                  });
              }
          })
          .catch(err => {
            console.log(err);
          })
        }
      });
    } else {
      this.translate.get('GENERIC.WARNING', {}).subscribe((res: string) => {
        this.translate.get('GENERIC.NETWORK_OFFLINE', {}).subscribe((res1: string) => {
          this.uiUtility.alertBox(res, res1);
        });
      });
    }
  }
}
