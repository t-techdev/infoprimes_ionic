import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform, ModalController, NavController, ActionSheetController, PopoverController, MenuController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { TouchID } from '@ionic-native/touch-id/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { ApiService } from './services/api/api.service';
import { UserService } from './services/user/user.service';
import { AppGlobals } from './shared/app.globals';

import { TouchidPage } from './pages/touchid/touchid.page';
import { PasscodePage } from './pages/passcode/passcode.page';
import { ResetpasswordConfirmPage } from './pages/resetpassword-confirm/resetpassword-confirm.page';
import { RoutingParamsService } from './services/routing-params/routing-params.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate: TranslateService,
    private oneSignal: OneSignal,
    private storage: Storage,
    private apiService: ApiService,
    private touchId: TouchID,
    private modalCtrl: ModalController,
    public appGlobal: AppGlobals,
    private userService: UserService,
    private globalization: Globalization,
    private deeplinks: Deeplinks,
    private navCtrl: NavController,
    private router: Router,
    private routingParamService: RoutingParamsService,
    private androidFingerprintAuth: AndroidFingerprintAuth,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private menu: MenuController,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      document.addEventListener("backbutton", () => {
        if(this.router.url.includes('tabs') || 
          this.router.url == '/login' || 
          this.router.url == '/' || 
          this.appGlobal.isOpenModal
        ) {
          this.platform.backButton.subscribeWithPriority(9999,  () => {});
        } else {
          this.closePopUps();
          this.navCtrl.back();
        }
      })

      this.getSensorType();
      this.statusBar.overlaysWebView(true);
      this.statusBar.styleDefault();
      if (this.platform.is('cordova')) {
        this.initOneSignal();
        this.globalization.getPreferredLanguage()
          .then(res => {
            if(res.value.split('-')[0] == 'en') {
              this.userService.setLang('en');
            }
            else {
              this.userService.setLang('fr');
            }
          })
          .catch(e => { console.log(e); })
      } else {
        this.userService.setLang('en');
      }

      this.storage.get('token')
        .then(token => { 
          this.userService.token = token; 
          this.checkLogin();
        })
        .catch(e => { console.log(e); });

      this.platform.pause.subscribe((() => {
        if(this.platform.is('android')) {
          if(this.appGlobal.preventPauseEV_1 || this.appGlobal.preventPauseEV_2 || this.appGlobal.preventPauseEV_3 || this.appGlobal.preventPauseEV_4)
            return;
        }
        this.storage.get('token')
          .then(res => {
            if(res) {
              if(this.appGlobal.isOpenModal || !this.appGlobal.passedAuthPhases) {}
              else {
                if(this.platform.is('ios')){
                  this.touchId.isAvailable()
                    .then(
                      (res) => {
                        this.modalCtrl.create({component: TouchidPage, componentProps: {resume: true}})
                          .then((modal) => {
                            modal.present().then((res) => {
                              this.appGlobal.isOpenModal = true;
                            });
                          });
                      },
                      (err) => {
                        this.modalCtrl.create({component: PasscodePage, componentProps: {resume: true}})
                          .then((modal) => {
                            modal.present().then((res) => {
                              this.appGlobal.isOpenModal = true;
                            });
                          });
                      }
                    );
                }
                if(this.platform.is('android')) {
                  this.androidFingerprintAuth.isAvailable()
                    .then(res => {
                      if(res.isAvailable) {
                        this.modalCtrl.create({component: TouchidPage, componentProps: {resume: true}})
                          .then((modal) => {
                            modal.present().then((res) => {
                              this.appGlobal.isOpenModal = true;
                            });
                          });
                      } else {
                        this.modalCtrl.create({component: PasscodePage, componentProps: {resume: true}})
                          .then((modal) => {
                            modal.present().then((res) => {
                              this.appGlobal.isOpenModal = true;
                            });
                          });
                      }
                    })
                    .catch(err => {
                      console.log(err);
                    })
                }
              }
            }
          })
          .catch(e => { console.log(e); });
      }));

      this.deeplinks.route({
        '/app/passwordreset/:email/:reset_token': ResetpasswordConfirmPage
        }).subscribe(match => {
          console.log('AAAAAAAAAAA---: ', JSON.stringify(match));
          this.router.navigateByUrl('/passwordreset/'+match.$args.email+'/'+match.$args.reset_token);
          // match.$route - the route we matched, which is the matched entry from the arguments to route()
          // match.$args - the args passed in the link
          // match.$link - the full link data
          console.log('Successfully matched route', match);
        }, nomatch => {
          // nomatch.$link - the full link data
          console.error('Got a deeplink that didn\'t match', nomatch);
        });
    });
  }

  initOneSignal() {
    this.oneSignal.startInit('db339b5c-3370-4758-b208-9d70e61b5d7e', '464172007115');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.handleNotificationReceived().subscribe((res) => {});
    this.oneSignal.handleNotificationOpened().subscribe((res) => {
      if(res.notification.payload.additionalData.type == 'email_verified') {
        this.storage.get('token')
          .then(res => {
            if(res && this.router.url == '/register') {
              if(!this.appGlobal.isOpenModal) {
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
              } else {
                this.router.navigate(['']);
              }
            }
          })
          .catch(e => { console.log(e); });
      } else {
        var redirect_url = res.notification.payload.additionalData.redirect_url
        if(redirect_url === '/dashboard') this.router.navigate(['/tabs', 'home']);
        else if(redirect_url === '/broker') this.router.navigate(['/tabs', 'broker']);
        else if(redirect_url === '/profile') this.router.navigate(['/tabs', 'my-profile']);
        else if(redirect_url === '/claims') this.router.navigate(['/tabs', 'reclamation']);
        else if(redirect_url === '/category') this.router.navigate(['/tabs', 'home']);
        else if(redirect_url === '/review') {
          this.router.navigate(['/tabs', 'my-profile']);
          this.router.navigateByUrl('profile-review');
        } else if(redirect_url.indexOf('policy/') > -1) {
          // sample policy number: 024312735L
          var policy_id = redirect_url.split('policy/')[1];
          let allInsurances = this.userService.userData.insurance.data;
          if(policy_id && allInsurances) {
            var policy = _.find(allInsurances, function(obj){
              return obj.sale_id === policy_id;
            });
            this.routingParamService.insuranceParmams.policy = policy;
            this.navCtrl.navigateForward('policy', {animationDirection: 'forward'});
          }
        }
      }
    });
    this.oneSignal.endInit();
  }

  checkLogin() {
    if(!this.userService.token) {
      this.splashScreen.hide();
      this.router.navigateByUrl('/login')
    } else {
      this.apiService.get('/auth/user', '')
        .subscribe((res) => {
          this.splashScreen.hide();
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
                        modal.present().then((res) => {
                          this.appGlobal.isOpenModal = true;
                        });
                        modal.onWillDismiss().then((res) => {
                          // this.navCtrl.navigateRoot('/resetpassword-confirm');
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
                        modal.present().then((res) => {
                          this.appGlobal.isOpenModal = true;
                        });
                        modal.onWillDismiss().then((res) => {
                          // this.navCtrl.navigateRoot('/resetpassword-confirm');
                          this.navCtrl.navigateRoot('/tabs');
                        });
                      });
                  }
                })
                .catch(err => {
                  console.log(err);
                })
            }
          } else {
            this.router.navigateByUrl('/register/true/true/' + sentEmail);
          }
        },
        (e) => {});
    }
  }

  getSensorType() {
    this.touchId.isAvailable()
      .then(res => {
        this.appGlobal.sensorType = res;
      })
      .catch(e => { console.log(e); });
  }

  async closePopUps() {
    // close action sheet
    try {
      const element = await this.actionSheetCtrl.getTop();
      if (element) {
        element.dismiss();
        return;
      }
    } catch (error) {}
    // close alert
    try {
      const element = await this.alertCtrl.getTop();
      if (element) {
        element.dismiss();
        return;
      }
    } catch (error) {}
    // close popover
    try {
      const element = await this.popoverCtrl.getTop();
      if (element) {
        element.dismiss();
        return;
      }
    } catch (error) {}
    // close modal
    try {
      const element = await this.modalCtrl.getTop();
      if (element) {
        element.dismiss();
        return;
      }
    } catch (error) {}
    // close side menua
    try {
      const element = await this.menu.getOpen();
      if (element !== null) {
        this.menu.close();
        return;
      }
    } catch (error) {}
  }
}
