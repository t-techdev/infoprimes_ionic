import { Component, OnInit, Inject } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { ActivatedRoute } from '@angular/router';

import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { ApiService } from '../../services/api/api.service';
import { UserService } from '../../services/user/user.service';
import { AppGlobals } from '../../shared/app.globals';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  selector: 'page-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: FormGroup;
  public email: string;
  public password: string;
  public confirmPassword: string;
  public registered: boolean = false;
  public registerError: boolean = false;
  public registerErrorMsg: string;
  public submitAttempt: boolean = false;
  public fromAppStart: boolean = false;
  public sentEmail: string;
  public resentEmail: boolean = false;
  public keyboardVisible: boolean = false;

  constructor(
    public navCtrl: NavController,
    public uiUtility: UiUtilsService,
    public apiService: ApiService,
    private userService: UserService,
    private oneSignal: OneSignal,
    private platform: Platform,
    private activatedRoute: ActivatedRoute,
    private appGlobal: AppGlobals,
    public translate: TranslateService
  ) {
    var that = this;
    window.addEventListener('keyboardWillShow', (event) => {
      that.keyboardVisible = true;
    });
    window.addEventListener('keyboardWillHide', () => {
      that.keyboardVisible = false;
    });
  }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ])),
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
    this.registered = JSON.parse(this.activatedRoute.snapshot.paramMap.get('registered'));
    this.fromAppStart = JSON.parse(this.activatedRoute.snapshot.paramMap.get('fromAppStart'));
    this.sentEmail = this.activatedRoute.snapshot.paramMap.get('sentEmail');
    // this.registered = true;
  }

  goBack(fromAppStart) {
    if(fromAppStart) {
      this.navCtrl.navigateRoot('/login')
    } else {
      this.navCtrl.navigateBack('/login');
    }
  }

  changeResStatus(value) {
    this.registerError = false;
  }

  register() {
    if(navigator.onLine) {
      this.submitAttempt = true;
      if (this.platform.is('cordova')) {
        this.oneSignal.getIds().then((ids) => {
          if(!this.user.invalid && this.password == this.confirmPassword) {
            let params = {
              email: this.email,
              password: this.password,
              password_confirmation: this.confirmPassword,
              device_token: ids.userId
            };
            this.uiUtility.showLoader();
            this.apiService.post('/auth/register', params, { observe: 'response' })
              .then(res => {
                this.uiUtility.hideLoader();
                this.userService.userID = res.body.user.id;

                this.userService.setAccessToken(res);
                this.registered = true;
              })
              .catch(e => {
                this.uiUtility.hideLoader();
                let errorBody = JSON.parse(e._body);
                this.registerError = true;
                this.registerErrorMsg = errorBody.errors.email[0];
              });
            }
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

  resendEmail() {
    this.uiUtility.showLoader();
    if(this.userService.token) {
      this.apiService.get('/auth/resend-activation', '')
        .subscribe((res) => {
          console.log('resend-activation res: ', res);
          this.uiUtility.hideLoader();
          let resBody = res.body;
          if(resBody.success) {
            this.userService.setAccessToken(res);
            this.resentEmail = true;
          }
        },
        (e) => {});
    }
  }
}
