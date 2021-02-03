import { Injectable } from '@angular/core';

import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiUtilsService {

  loading: any;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) { 

  }

  async alertBox(header, subHeader, didDismissFunc = function(){}) {
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      buttons: ['OK']
    });

    alert.onDidDismiss()
      .then(res => {
        didDismissFunc();
      })
      .catch(e => {});
    await alert.present();
  }

  async confirmAlertBox(header, message, cancelTxt, okTxt, cancelFunc, okFunc) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [
        {
          text: cancelTxt,
          role: 'cancel',
          handler: () => {
            cancelFunc();
          }
        },
        {
          text: okTxt,
          handler: () => {
            okFunc();
          }
        }
      ]
    });
    await alert.present();
  }

  async toastMsg(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      cssClass: 'custom-toast-message'
    });
    await toast.present();
  }

  async showLoader(message: string = '') {
    this.loading = await this.loadingCtrl.create({
      message: message,
      cssClass: 'custom-loader'
    });
    return await this.loading.present();
  }

  hideLoader() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}
