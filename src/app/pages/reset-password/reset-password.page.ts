import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { TranslateService } from '@ngx-translate/core';

declare var window;

@Component({
  selector: 'page-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  user: FormGroup;
  public email: string;
  public emailSent: boolean = false;
  public submitAttempt: boolean = false;
  public keyboardVisible: boolean = false;

  constructor(
    public navCtrl: NavController,
    private apiService: ApiService,
    public translate: TranslateService,
    private uiUtility: UiUtilsService
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
      ]))
    });
  }

  goBack() {
    this.navCtrl.navigateBack('/login');
  }

  resetPassword() {
    if(navigator.onLine) {
      this.submitAttempt = true;
      if(!this.user.invalid) {
        let params = {
          email: this.email
        };
        this.uiUtility.showLoader();
        this.apiService.get('/auth/reset', params)
          .subscribe((res) => {
            this.uiUtility.hideLoader();
            if(res.body.success) {
              this.emailSent = true;
            } else {
              let errorMsg = res.body.error;
              this.translate.get('GENERIC.ERROR', {}).subscribe((res: string) => {
                this.uiUtility.alertBox(res, errorMsg);
              });
            }
          },
          (e) => {
            this.uiUtility.hideLoader();
            let errors = e.error.errors;
            let errorMsg = '';
            if(errors) {
              Object.keys(errors).map(function(k) {
                errorMsg += ' ' + errors[k][0];
              });
            } else {
              errorMsg = e.error.message;
            }
            this.translate.get('GENERIC.ERROR', {}).subscribe((res: string) => {
              this.uiUtility.alertBox(res, errorMsg);
            });
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
