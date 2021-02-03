import { Component, NgZone, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TouchID } from '@ionic-native/touch-id/ngx';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api/api.service';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { AppGlobals } from '../../shared/app.globals';
import { TranslateService } from '@ngx-translate/core';

import { TabsPage } from '../tabs/tabs.page';
import { TouchidPage } from '../touchid/touchid.page';
import { PasscodePage } from '../passcode/passcode.page';
import { UserService } from '../../services/user/user.service';

export class PasswordValidator {
  static validPassword(fc: FormControl){
    let val = fc.value;
    if(val == undefined) val = '';
    let num = val.match(/\d/g);
    if(num == null) {
      return ({validPassword: true});
    } else {
      if(num.length > 3) {
        return (null);
      } else {
        return ({validPassword: true});
      }
    }
  }
}

@Component({
  selector: 'page-resetpassword-confirm',
  templateUrl: './resetpassword-confirm.page.html',
  styleUrls: ['./resetpassword-confirm.page.scss'],
})
export class ResetpasswordConfirmPage implements OnInit {
  user: FormGroup;
  public submitAttempt: boolean = false;
  public password: string;
  public confirmPassword: string;
  private email: string;
  private reset_token: string;
  public resetError: boolean = false;
  constructor(public navCtrl: NavController,
    private apiService: ApiService,
    private modalCtrl: ModalController,
    private touchId: TouchID,
    private appGlobal: AppGlobals,
    private userService: UserService,
    private zone: NgZone,
    private uiUtility: UiUtilsService,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordConfirmPage');
  }

  ngOnInit() {
    // this.zone.run(() => {
      this.user = new FormGroup({
        password: new FormControl('', Validators.compose([
          PasswordValidator.validPassword,
          Validators.minLength(10),
          Validators.required
        ])),
        confirmPassword: new FormControl('', Validators.compose([
          PasswordValidator.validPassword,
          Validators.minLength(10),
          Validators.required
        ]))
      });
      this.email = this.activatedRoute.snapshot.paramMap.get('email');
      this.reset_token = this.activatedRoute.snapshot.paramMap.get('reset_token');
    // });
  }

  goBack() {
    this.navCtrl.navigateRoot('/login');
  }

  resetPWD() {
    // this.zone.run(() => {
      this.submitAttempt = true;
      if(!this.user.invalid) {
        if(this.password == this.confirmPassword) {
          this.uiUtility.showLoader();
          const params = {
            email: this.email,
            reset_token: this.reset_token,
            password: this.password,
            password_confirmation: this.confirmPassword
          };
          
          this.apiService.post('/auth/reset', params, { observe: 'response' })
            .then((res) => {
              this.uiUtility.hideLoader();
              this.userService.userID = res.body.user.id;
              this.userService.setAccessToken(res);
              this.translate.get('PASSWORD_RECOVERY.SUCCESS', {}).subscribe((res: string) => {
                // this.uiUtility.toastMsg(res);
              });
              this.navCtrl.navigateRoot('/tabs');
              this.touchId.isAvailable()
                .then(
                  (res) => {
                    /*
                    let touchIdModal = this.modalCtrl.create(TouchidPage, {});
                    touchIdModal.present()
                      .then(res => {
                        this.appGlobal.isOpenModal = true;
                      });
                    touchIdModal.onWillDismiss(res => {
                      this.navCtrl.setRoot(TabsPage);
                    });
                    */
                  },
                  (err) => {
                    /*
                    let passcodeModal = this.modalCtrl.create(PasscodePage, {})
                    passcodeModal.present()
                      .then(res => {
                        this.appGlobal.isOpenModal = true;
                      });
                    passcodeModal.onWillDismiss(res => {
                      this.navCtrl.setRoot(TabsPage);
                    });
                    */
                  }
                );
            }).catch((e) => {});
        }
      }
    // });
  }
}
