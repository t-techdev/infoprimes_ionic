import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { TouchID } from '@ionic-native/touch-id/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';

import { AppRoutingModule } from './app-routing.module';
import { SendgridModule  } from 'ngx-sendgrid';
import { AppComponent } from './app.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { PasscodePage } from './pages/passcode/passcode.page';
import { TouchidPage } from './pages/touchid/touchid.page';
import { OfflinePage } from './pages/offline/offline.page';
import { HttpConfigInterceptorService } from './services/interceptor/httpConfig.interceptor.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, TouchidPage, PasscodePage, OfflinePage],
  entryComponents: [TouchidPage, PasscodePage, OfflinePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      hardwareBackButton: false
    }),
    IonicModule.forRoot({
      rippleEffect: false
    }),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    SendgridModule.forRoot({token:'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'}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    OneSignal,
    CallNumber,
    SMS,
    EmailComposer,
    Keyboard,
    TouchID,
    Vibration,
    Deeplinks,
    Network,
    Globalization,
    AndroidFingerprintAuth,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
