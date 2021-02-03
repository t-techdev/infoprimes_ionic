import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { ApiService } from '../../services/api/api.service';
import { AppGlobals } from '../../shared/app.globals';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user/user.service';
import { RoutingParamsService } from '../../services/routing-params/routing-params.service';

import * as _ from 'lodash';

@Component({
  selector: 'page-household-profile',
  templateUrl: './household-profile.page.html',
  styleUrls: ['./household-profile.page.scss'],
})
export class HouseholdProfilePage implements OnInit {
  public contact: any;
  public policies: Array<any> = [];
  public cameraImageUrl: any = '';

  constructor(
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    public uiUtility: UiUtilsService,
    public apiService: ApiService,
    public userService: UserService,
    public appGlobal: AppGlobals,
    private camera: Camera,
    private routingParamService: RoutingParamsService,
    public translate: TranslateService
  ) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.contact = this.routingParamService.insuranceParmams.contact;
    var contactId = this.contact.id;
    let insurances = this.userService.userData.insurance.data;
    this.policies = _.filter(insurances, function(obj){
      return obj.contact_id == contactId;
    });
  }

  ionViewWillLeave() {
    this.appGlobal.preventPauseEV_1 = false;
    this.appGlobal.preventPauseEV_2 = false;
    this.appGlobal.preventPauseEV_3 = false;
    this.appGlobal.preventPauseEV_4 = false;
  }

  goBack() {
    this.navCtrl.back();
  }

  goMyPolicies(contact: any) {
    this.routingParamService.insuranceParmams.contact = contact;
    this.navCtrl.navigateForward('/my-policies', {animationDirection: 'forward'});
  }

  goProfileReview() {
    this.navCtrl.navigateForward('/profile-review', {animationDirection: 'forward'});
  }

  specifyAddress(address: string, city: string, province: string, postalcode: string) {
    return address + ',<br>' + city + ',<br>' + province + ',<br>' + postalcode;
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
      this.uploadPhoto(this.cameraImageUrl);
     }, (err) => {
      console.log(JSON.stringify(err));
     });
  }

  uploadPhoto(imageData) {
    this.uiUtility.showLoader();
    this.apiService.post('/client/picture/' + this.contact.id + '/contact', {file_encoded: imageData}, { observe: 'response' })
      .then((res: any) => {
        this.userService.setAccessToken(res);
        var that = this;
        _.forEach(this.userService.userData.contacts.data, function(contact) {
          if(contact.id == that.contact.id) {
            contact.image = res.body.data.image;
          }
        });
        this.uiUtility.hideLoader();
      })
      .catch((e: any) => {});
  }
}
