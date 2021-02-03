import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { ApiService } from '../api/api.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { UiUtilsService } from '../ui-utils/ui-utils.service';
import { NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SendgridService } from 'ngx-sendgrid';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class HttpConfigInterceptorService implements HttpInterceptor {
  public errorMsg: string;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private httpClient: HttpClient,
    private storage: Storage,
    private translate: TranslateService,
    public uiUtility: UiUtilsService,
    public navCtrl: NavController,
    private splashScreen: SplashScreen,
    public sgService: SendgridService
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return forkJoin(
      this.storage.get('token'),
      this.storage.get('userLastResUnixTime')
    ).pipe(
      switchMap(([token, userLastResUnixTime]) => {
        request = token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request;
        request = request.clone({ setHeaders: { 'Content-Type':  'application/json' } });
        if(this.userService.accessTokenExpired(userLastResUnixTime) && !request.url.endsWith('/auth/token/refresh') && request.url.startsWith('https')) {
          return this.httpClient.get(this.apiService.serverUrl + '/auth/token/refresh', { observe: 'response' }).flatMap(
            (data: any) => {
              this.userService.setAccessToken(data);
              request = request.clone({ setHeaders: { 'Authorization': `Bearer ${this.userService.token}` } });
              return next.handle(request).pipe(
                catchError((error: HttpErrorResponse) => {
                  this.errorHandler(error);
                  return throwError(error);
                }));
            }
          );
        } else {
          return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
              this.errorHandler(error);
              return throwError(error);
            }));
        }
      })
    );
  }

  errorHandler(err: any = '') {  
    this.uiUtility.hideLoader();
    if(err.error.message == 'Invalid credentials' && err.error.status_code == '401' && err.url.endsWith('auth/token')) {
      return;
    }
    this.translate.get('GENERIC.ERROR_ALERT', {}).subscribe((res: string) => {
      this.errorMsg = res;
    });
    var that = this;
    this.uiUtility.alertBox('', this.errorMsg, function() {
      // that.storage.remove('leadId');
      that.userService.removeAccessToken();
      that.splashScreen.hide();
      that.navCtrl.navigateRoot('/login');
    });

    let user = _.find(this.userService.userData.contacts.data, {role: 'main'});
    let sender = user.email ? user.email : '';
    let reportErrorMsg: string;
    reportErrorMsg = 'LEAD ID: ' + this.userService.leadId + ', USER: ' + user.firstname + ' ' + user.lastname + ', Error detail: ';
    if(err)
      reportErrorMsg = reportErrorMsg + JSON.stringify(err);
    else 
      reportErrorMsg = reportErrorMsg + this.errorMsg;

    
    this.sgService.BasicEmailToSingleUser( 'admin@infoprimes.com', sender, 'Error Reporting', reportErrorMsg)
      .subscribe( (res) => {},
      (e) => {});
    
  }
}
