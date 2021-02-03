import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import '../rxjs-extensions';
import 'rxjs/Rx';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

import { ModalController } from '@ionic/angular';
import { OfflinePage } from '../../pages/offline/offline.page';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public serverUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private modalCtrl: ModalController,
    private uiUtility: UiUtilsService
  ) {

  }

  public get(endpoint: string, params: any = {}): any {
    if(!navigator.onLine) {
      this.offlineHandle();
      return new EmptyObservable();
    }
    return this.httpClient.get(this.serverUrl + endpoint + '?' + this.serialize(params), { observe: 'response' });
  }
  
  public post(endpoint: string, obj: any, additionalParam = {}): any {
    if(!navigator.onLine) {
      this.offlineHandle();
      return new EmptyObservable();
    }
    return this.httpClient.post(this.serverUrl + endpoint, JSON.stringify(obj), additionalParam).toPromise();
  }

  public patch(endpoint: string, body: any = {}): any {
    if(!navigator.onLine) {
      this.offlineHandle();
      return new EmptyObservable();
    }
    return this.httpClient.patch(this.serverUrl + endpoint, body, { observe: 'response' });
  }
  
  public delete(endpoint: string): any {
    if(!navigator.onLine) {
      this.offlineHandle();
      return new EmptyObservable();
    }
    return this.httpClient.delete(this.serverUrl + endpoint, { observe: 'response' }).toPromise();
  }
  
  private serialize(obj: any): string {
    var str = [];
    for(var p in obj)
      if(obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }  

  private offlineHandle() {
    this.modalCtrl.dismiss();
    this.modalCtrl.create({component: OfflinePage, componentProps: {}})
      .then((modal) => {
        modal.present().then((res) => {
          this.uiUtility.hideLoader();
        });
    });
  }
}
