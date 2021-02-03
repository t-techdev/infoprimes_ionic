import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, Platform } from '@ionic/angular';
import { TouchID } from '@ionic-native/touch-id/ngx';
import { TranslateService } from '@ngx-translate/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';
import { Router } from '@angular/router';

import { RegisterPage } from '../register/register.page';
import { TouchidPage } from '../touchid/touchid.page';
import { PasscodePage } from '../passcode/passcode.page';

import { ApiService } from '../../services/api/api.service';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { NetworkService } from '../../services/network/network.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppGlobals } from '../../shared/app.globals';
import { UserService } from '../../services/user/user.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'page-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: FormGroup;
  public email: string;
  public password: string;
  public unauthorized: boolean = false;
  public submitAttempt: boolean = false;
  private networkConnected: boolean = false;

  constructor(
    public navCtrl: NavController,
    public translate: TranslateService,
    private apiService: ApiService,
    private uiUtility: UiUtilsService,
    private userService: UserService,
    private touchId: TouchID,
    private appGlobal: AppGlobals,
    public networkService: NetworkService,
    private modalCtrl: ModalController,
    private router: Router,
    private pl: Platform,
    private oneSignal: OneSignal,
    private androidFingerprintAuth: AndroidFingerprintAuth,
    private platform: Platform
  ) {
    this.init();
  }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.required
      ]))
    });
    // this.networkSubscriber();
  }

  init() {
    
  }

  networkSubscriber(): void {
    this.networkService
      .getNetworkStatus()
      .pipe(debounceTime(300))
      .subscribe((connected: boolean) => {
        this.networkConnected = connected;
      });
  }

  login() {
    if(!window.cordova) {
      if(navigator.onLine) {
        this.submitAttempt = true;
        if(!this.user.invalid) {
          this.loginProc();
        }
      } else {
        this.translate.get('GENERIC.WARNING', {}).subscribe((res: string) => {
          this.translate.get('GENERIC.NETWORK_OFFLINE', {}).subscribe((res1: string) => {
            this.uiUtility.alertBox(res, res1);
          });
        });
      }
    } else {
      if(navigator.onLine) {
        this.submitAttempt = true;
        if(!this.user.invalid) {
          this.oneSignal.getIds().then((ids) => {
            this.loginProc(ids.userId);
          });
        }
      } else {
        this.translate.get('GENERIC.WARNING', {}).subscribe((res: string) => {
          this.translate.get('GENERIC.NETWORK_OFFLINE', {}).subscribe((res1: string) => {
            this.uiUtility.alertBox(res, res1);
          });
        });
      }
    }
  }

  loginProc(deviceToken: string = '') {
    let params = {}
    if(deviceToken)
      params = {
        email: this.email,
        password: this.password,
        device_token: deviceToken
      };
    else
      params = {
        email: this.email,
        password: this.password
      };
    this.uiUtility.showLoader();
    this.apiService.post('/auth/token', params, { observe: 'response' })
      .then(res => {
        this.unauthorized = false;
        this.userService.setAccessToken(res);

        this.apiService.get('/auth/user', '')
          .subscribe((res) => {
            this.uiUtility.hideLoader();
            this.userService.setAccessToken(res);
            let sentEmail = res.body.client.email;
            this.userService.userID = res.body.client.id;
            if(res.body.client.active) {
              if(this.platform.is('ios')) {
                this.touchId.isAvailable()
                  .then(
                    (res) => {
                      this.modalCtrl.create({component: TouchidPage, componentProps: {}})
                        .then((modal) => {
                          modal.present().then((res) => {
                            this.appGlobal.isOpenModal = true;
                          });
                          modal.onWillDismiss().then(res => {
                            this.router.navigate(['/tabs']);
                          });
                        });
                    },
                    (err) => {
                      this.modalCtrl.create({component: PasscodePage, componentProps: {}})
                        .then((modal) => {
                          modal.present().then((res) => {
                            this.appGlobal.isOpenModal = true;
                          });
                          modal.onWillDismiss().then((res) => {
                            this.router.navigate(['/tabs']);
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
                          modal.present().then((res) => {
                            this.appGlobal.isOpenModal = true;
                          });
                          modal.onWillDismiss().then(res => {
                            this.router.navigate(['/tabs']);
                          });
                        });
                    } else {
                      this.modalCtrl.create({component: PasscodePage, componentProps: {}})
                        .then((modal) => {
                          modal.present().then((res) => {
                            this.appGlobal.isOpenModal = true;
                          });
                          modal.onWillDismiss().then((res) => {
                            this.router.navigate(['/tabs']);
                          });
                        });
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  })
              }
            } else {
              // this.navCtrl.setRoot(RegisterPage, {registered: true, fromAppStart: true, sentEmail: sentEmail});
            }
          },
          (e) => {
            this.userService.removeAccessToken();
          });
      })
      .catch(e => {
        this.unauthorized = true;
      });
  }

  goRegister() {
    this.router.navigateByUrl('/register');
  }

  resetPassword() {
    this.router.navigateByUrl('/reset-password');
  }

  changeAuthStatus(value) {
    this.unauthorized = false;
  }

}
